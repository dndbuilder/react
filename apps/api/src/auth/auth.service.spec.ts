import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { UnauthorizedException } from "@nestjs/common";
import { User, UserRole } from "../users/entities/user.entity";

describe("AuthService", () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let mailerService: MailerService;

  const mockUsersService = {
    create: jest.fn(),
    findByEmailOrFail: jest.fn(),
    findByEmail: jest.fn(),
    updateProfile: jest.fn(),
    regenerateLicenseKey: jest.fn(),
    setPasswordResetToken: jest.fn(),
    resetPassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("forgotPassword", () => {
    it("should send a password reset email and return a generic message", async () => {
      // Arrange
      const email = "test@example.com";
      const resetToken = {
        token: "reset-token",
        expires: new Date(),
      };
      const user = {
        id: "1",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
      };

      mockUsersService.setPasswordResetToken.mockResolvedValue(resetToken);
      mockUsersService.findByEmailOrFail.mockResolvedValue(user);
      mockMailerService.sendMail.mockResolvedValue(true);

      // Act
      const result = await service.forgotPassword(email);

      // Assert
      expect(result).toEqual({
        message: "If the email exists, a password reset link will be sent.",
      });
      expect(mockUsersService.setPasswordResetToken).toHaveBeenCalledWith(email);
      expect(mockUsersService.findByEmailOrFail).toHaveBeenCalledWith(email);
      expect(mockMailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Password Reset Request',
        template: 'password-reset',
        context: {
          name: user.firstName,
          resetUrl: expect.stringContaining(resetToken.token),
        },
      });
    });

    it("should return a generic message if email doesn't exist", async () => {
      // Arrange
      const email = "nonexistent@example.com";
      mockUsersService.setPasswordResetToken.mockRejectedValue(new Error("User not found"));

      // Act
      const result = await service.forgotPassword(email);

      // Assert
      expect(result).toEqual({
        message: "If the email exists, a password reset link will be sent.",
      });
      expect(mockUsersService.setPasswordResetToken).toHaveBeenCalledWith(email);
      expect(mockMailerService.sendMail).not.toHaveBeenCalled();
    });
  });

  describe("resetPassword", () => {
    it("should reset the password and return a success message", async () => {
      // Arrange
      const token = "valid-token";
      const newPassword = "newPassword123";
      const user = {
        id: "1",
        email: "test@example.com",
      };

      mockUsersService.resetPassword.mockResolvedValue(user);

      // Act
      const result = await service.resetPassword(token, newPassword);

      // Assert
      expect(result).toEqual({
        message: "Password has been reset successfully.",
      });
      expect(mockUsersService.resetPassword).toHaveBeenCalledWith(token, newPassword);
    });

    it("should throw an error if token is invalid", async () => {
      // Arrange
      const token = "invalid-token";
      const newPassword = "newPassword123";

      mockUsersService.resetPassword.mockRejectedValue(new Error("Invalid or expired token"));

      // Act & Assert
      await expect(service.resetPassword(token, newPassword)).rejects.toThrow("Invalid or expired token");
      expect(mockUsersService.resetPassword).toHaveBeenCalledWith(token, newPassword);
    });
  });
});
