import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { LoginDto } from '../src/auth/dto/login.dto';
import { UsersService } from '../src/users/users.service';
import { UserRole } from '../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let jwtService: JwtService;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    
    usersService = app.get<UsersService>(UsersService);
    jwtService = app.get<JwtService>(JwtService);
    
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      // Mock the user creation to avoid actual database operations
      jest.spyOn(usersService, 'create').mockImplementation(async (createUserDto: CreateUserDto) => {
        return {
          id: 'test-id',
          email: createUserDto.email,
          password: 'hashed-password',
          firstName: createUserDto.firstName || '',
          lastName: createUserDto.lastName || '',
          role: UserRole.CUSTOMER,
          validatePassword: async () => true,
        };
      });

      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(createUserDto)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe(createUserDto.email);
      expect(response.body.firstName).toBe(createUserDto.firstName);
      expect(response.body.lastName).toBe(createUserDto.lastName);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for invalid registration data', async () => {
      const invalidUserDto = {
        email: 'not-an-email',
        password: '123', // Too short
      };

      return request(app.getHttpServer())
        .post('/auth/register')
        .send(invalidUserDto)
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login a user and return a token', async () => {
      // Mock the user finding and validation to avoid actual database operations
      jest.spyOn(usersService, 'findByEmail').mockImplementation(async (email: string) => {
        return {
          id: 'test-id',
          email,
          password: 'hashed-password',
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.CUSTOMER,
          validatePassword: async () => true,
        };
      });

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe(loginDto.email);
      authToken = response.body.token;
    });

    it('should return 401 for invalid credentials', async () => {
      // Mock the user finding and validation to return false for password validation
      jest.spyOn(usersService, 'findByEmail').mockImplementation(async (email: string) => {
        return {
          id: 'test-id',
          email,
          password: 'hashed-password',
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.CUSTOMER,
          validatePassword: async () => false,
        };
      });

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);
    });
  });

  describe('/auth/profile (GET)', () => {
    it('should return the user profile when authenticated', async () => {
      // Create a valid JWT token for testing
      const payload = {
        sub: 'test-id',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
      };
      const token = jwtService.sign(payload);

      // Mock the user finding to avoid actual database operations
      jest.spyOn(usersService, 'findById').mockImplementation(async (id: string) => {
        return {
          id,
          email: 'test@example.com',
          password: 'hashed-password',
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.CUSTOMER,
          validatePassword: async () => true,
        };
      });

      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 401 when not authenticated', async () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);
    });

    it('should return 401 with invalid token', async () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});