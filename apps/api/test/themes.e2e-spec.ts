import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { User } from '../src/users/entities/user.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Theme } from '../src/themes/entities/theme.entity';

describe('ThemesController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let userModel: Model<User>;
  let themeModel: Model<Theme>;
  let authToken: string;
  let userId: string;
  let testThemeId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    jwtService = app.get<JwtService>(JwtService);
    userModel = app.get<Model<User>>(getModelToken(User.name));
    themeModel = app.get<Model<Theme>>(getModelToken(Theme.name));

    // Create a test user
    const testUser = await userModel.create({
      email: 'test-themes@example.com',
      password: 'hashedPassword',
      firstName: 'Test',
      lastName: 'User',
    });
    userId = testUser.id;

    // Create a JWT token for the test user
    authToken = jwtService.sign({ sub: userId, email: testUser.email });

    // Create a test theme
    const testTheme = await themeModel.create({
      name: 'Test Theme',
      settings: { color: 'blue', fontSize: 16 },
      isActive: false,
      userId,
    });
    testThemeId = testTheme.id;
  });

  afterAll(async () => {
    // Clean up test data
    await themeModel.deleteMany({ userId });
    await userModel.deleteOne({ _id: userId });
    await app.close();
  });

  describe('POST /themes/active', () => {
    it('should set an existing theme as active', async () => {
      return request(app.getHttpServer())
        .post('/themes/active')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ themeId: testThemeId })
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBe(testThemeId);
          expect(res.body.isActive).toBe(true);
        });
    });

    it('should create a new active theme', async () => {
      const newTheme = {
        name: 'New Active Theme',
        settings: { color: 'red', fontSize: 18 },
      };

      return request(app.getHttpServer())
        .post('/themes/active')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTheme)
        .expect(201)
        .expect((res) => {
          expect(res.body.name).toBe(newTheme.name);
          expect(res.body.settings).toEqual(newTheme.settings);
          expect(res.body.isActive).toBe(true);
        });
    });

    it('should return 400 if neither themeId nor name/settings are provided', async () => {
      return request(app.getHttpServer())
        .post('/themes/active')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);
    });

    it('should return 404 if themeId does not exist', async () => {
      return request(app.getHttpServer())
        .post('/themes/active')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ themeId: '60a1b2c3d4e5f6a7b8c9d0e1' }) // Non-existent ID
        .expect(404);
    });
  });
});