import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { LoginDto } from '../src/auth/dto/login.dto';
import { UsersService } from '../src/users/users.service';
import { UserRole } from '../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from '../src/auth/dto/forgot-password.dto';
import { ResetPasswordDto } from '../src/auth/dto/reset-password.dto';

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
          licenseKey: 'test-license-key',
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
          licenseKey: 'test-license-key',
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
          licenseKey: 'test-license-key',
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
          licenseKey: 'test-license-key',
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

  // Tests for the missing endpoints
  describe('/auth/profile (PUT)', () => {
    it.skip('should update the user profile when authenticated', async () => {
      // Create a valid JWT token for testing
      const payload = {
        sub: 'test-id',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
      };
      const token = jwtService.sign(payload);

      const updateProfileDto = {
        firstName: 'Updated',
        lastName: 'Name',
        email: 'updated@example.com',
      };

      const response = await request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateProfileDto)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe(updateProfileDto.firstName);
      expect(response.body.lastName).toBe(updateProfileDto.lastName);
      expect(response.body.email).toBe(updateProfileDto.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it.skip('should return 401 when not authenticated', async () => {
      const updateProfileDto = {
        firstName: 'Updated',
        lastName: 'Name',
        email: 'updated@example.com',
      };

      return request(app.getHttpServer())
        .put('/auth/profile')
        .send(updateProfileDto)
        .expect(401);
    });
  });

  describe('/auth/social-login (POST)', () => {
    it.skip('should login a user with social provider', async () => {
      const socialLoginDto = {
        provider: 'google',
        email: 'test@example.com',
        name: 'Test User',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/social-login')
        .send(socialLoginDto)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('email');
      expect(response.body).not.toHaveProperty('password');
    });

    it.skip('should return 400 for invalid social login data', async () => {
      const invalidSocialLoginDto = {
        provider: 'invalid-provider',
        email: 'test@example.com',
      };

      return request(app.getHttpServer())
        .post('/auth/social-login')
        .send(invalidSocialLoginDto)
        .expect(400);
    });
  });

  describe('/auth/regenerate-license-key (PUT)', () => {
    it.skip('should regenerate a license key when authenticated', async () => {
      // Create a valid JWT token for testing
      const payload = {
        sub: 'test-id',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
      };
      const token = jwtService.sign(payload);

      const response = await request(app.getHttpServer())
        .put('/auth/regenerate-license-key')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('licenseKey');
      expect(response.body.licenseKey).not.toBe('test-license-key');
    });

    it.skip('should return 401 when not authenticated', async () => {
      return request(app.getHttpServer())
        .put('/auth/regenerate-license-key')
        .expect(401);
    });
  });

  describe('/auth/forgot-password (POST)', () => {
    it('should initiate password reset and return a generic message', async () => {
      // Mock the setPasswordResetToken method
      jest.spyOn(usersService, 'setPasswordResetToken').mockImplementation(async (email: string) => {
        return {
          token: 'test-reset-token',
          expires: new Date(Date.now() + 3600000), // 1 hour from now
        };
      });

      // Mock the findByEmailOrFail method
      jest.spyOn(usersService, 'findByEmailOrFail').mockImplementation(async (email: string) => {
        return {
          id: 'test-id',
          email,
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.CUSTOMER,
          licenseKey: 'test-license-key',
        } as any;
      });

      const forgotPasswordDto: ForgotPasswordDto = {
        email: 'test@example.com',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send(forgotPasswordDto)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('If the email exists, a password reset link will be sent.');
    });

    it('should return a generic message even if email does not exist', async () => {
      // Mock the setPasswordResetToken method to throw an error
      jest.spyOn(usersService, 'setPasswordResetToken').mockImplementation(async (email: string) => {
        throw new Error('User not found');
      });

      const forgotPasswordDto: ForgotPasswordDto = {
        email: 'nonexistent@example.com',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send(forgotPasswordDto)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('If the email exists, a password reset link will be sent.');
    });

    it('should return 400 for invalid email format', async () => {
      const invalidForgotPasswordDto = {
        email: 'not-an-email',
      };

      return request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send(invalidForgotPasswordDto)
        .expect(400);
    });
  });

  describe('/auth/reset-password (POST)', () => {
    it('should reset password and return a success message', async () => {
      // Mock the resetPassword method
      jest.spyOn(usersService, 'resetPassword').mockImplementation(async (token: string, newPassword: string) => {
        return {
          id: 'test-id',
          email: 'test@example.com',
          password: 'new-hashed-password',
          firstName: 'Test',
          lastName: 'User',
          role: UserRole.CUSTOMER,
          licenseKey: 'test-license-key',
        } as any;
      });

      const resetPasswordDto: ResetPasswordDto = {
        token: 'valid-reset-token',
        password: 'newPassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/reset-password')
        .send(resetPasswordDto)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Password has been reset successfully.');
    });

    it('should return 400 for invalid token or password', async () => {
      const invalidResetPasswordDto = {
        token: '', // Empty token
        password: '123', // Too short
      };

      return request(app.getHttpServer())
        .post('/auth/reset-password')
        .send(invalidResetPasswordDto)
        .expect(400);
    });

    it('should return 404 for invalid or expired token', async () => {
      // Mock the resetPassword method to throw an error
      jest.spyOn(usersService, 'resetPassword').mockImplementation(async (token: string, newPassword: string) => {
        throw new Error('Password reset token is invalid or has expired');
      });

      const resetPasswordDto: ResetPasswordDto = {
        token: 'invalid-reset-token',
        password: 'newPassword123',
      };

      return request(app.getHttpServer())
        .post('/auth/reset-password')
        .send(resetPasswordDto)
        .expect(404);
    });
  });
});
