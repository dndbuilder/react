import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { User, UserRole } from "../users/entities/user.entity";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UnauthorizedException } from "@nestjs/common";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    updateProfile: jest.fn(),
    socialLogin: jest.fn(),
    regenerateLicenseKey: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("register", () => {
    it("should register a new user and return auth response", async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      };

      const authResponse: AuthResponseDto = {
        id: "1",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        role: UserRole.CUSTOMER,
        token: "jwt-token",
      };

      mockAuthService.register.mockResolvedValue(authResponse);

      // Act
      const result = await controller.register(createUserDto);

      // Assert
      expect(result).toEqual(authResponse);
      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
    });

    it("should throw an error if registration fails", async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      };

      mockAuthService.register.mockRejectedValue(new Error("Registration failed"));

      // Act & Assert
      await expect(controller.register(createUserDto)).rejects.toThrow("Registration failed");
      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("login", () => {
    it("should login a user and return auth response", async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: "test@example.com",
        password: "password123",
      };

      const authResponse: AuthResponseDto = {
        id: "1",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        role: UserRole.CUSTOMER,
        token: "jwt-token",
        password: undefined,
      };

      mockAuthService.login.mockResolvedValue(authResponse);

      // Act
      const result = await controller.login(loginDto);

      // Assert
      expect(result).toEqual(authResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });

    it("should throw an error if login fails", async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: "test@example.com",
        password: "wrong-password",
      };

      mockAuthService.login.mockRejectedValue(new UnauthorizedException("Invalid credentials"));

      // Act & Assert
      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe("getProfile", () => {
    it("should return the user profile without password and validatePassword", async () => {
      // Arrange
      const user: User = {
        id: "1",
        email: "test@example.com",
        password: "hashed-password",
        firstName: "Test",
        lastName: "User",
        licenseKey: "license-key",
        role: UserRole.CUSTOMER,
      };

      // Act
      const result = await controller.getProfile(user);

      // Assert
      expect(result).toEqual({
        id: "1",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        licenseKey: "license-key",
        role: UserRole.CUSTOMER,
      });
      expect(result).not.toHaveProperty("password");
      expect(result).not.toHaveProperty("validatePassword");
    });
  });

  describe("updateProfile", () => {
    it("should update the user profile and return the updated profile", async () => {
      // Arrange
      const user: User = {
        id: "1",
        email: "test@example.com",
        password: "hashed-password",
        firstName: "Test",
        lastName: "User",
        licenseKey: "license-key",
        role: UserRole.CUSTOMER,
      };

      const updateProfileDto = {
        firstName: "Updated",
        lastName: "Name",
        email: "updated@example.com",
      };

      const updatedUser = {
        id: "1",
        email: "updated@example.com",
        firstName: "Updated",
        lastName: "Name",
        licenseKey: "license-key",
        role: UserRole.CUSTOMER,
      };

      mockAuthService.updateProfile.mockResolvedValue(updatedUser);

      // Act
      const result = await controller.updateProfile(user, updateProfileDto);

      // Assert
      expect(result).toEqual(updatedUser);
      expect(mockAuthService.updateProfile).toHaveBeenCalledWith(user.id, updateProfileDto);
    });

    it("should throw an error if update fails", async () => {
      // Arrange
      const user: User = {
        id: "1",
        email: "test@example.com",
        password: "hashed-password",
        firstName: "Test",
        lastName: "User",
        licenseKey: "license-key",
        role: UserRole.CUSTOMER,
      };

      const updateProfileDto = {
        firstName: "Updated",
        lastName: "Name",
        email: "updated@example.com",
      };

      mockAuthService.updateProfile.mockRejectedValue(new Error("Update failed"));

      // Act & Assert
      await expect(controller.updateProfile(user, updateProfileDto)).rejects.toThrow("Update failed");
      expect(mockAuthService.updateProfile).toHaveBeenCalledWith(user.id, updateProfileDto);
    });
  });

  describe("socialLogin", () => {
    it("should login a user with social provider and return auth response", async () => {
      // Arrange
      const socialLoginDto = {
        provider: "google",
        email: "test@example.com",
        name: "Test User",
      };

      const authResponse: AuthResponseDto = {
        id: "1",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        role: UserRole.CUSTOMER,
        token: "jwt-token",
      };

      mockAuthService.socialLogin.mockResolvedValue(authResponse);

      // Act
      const result = await controller.socialLogin(socialLoginDto);

      // Assert
      expect(result).toEqual(authResponse);
      expect(mockAuthService.socialLogin).toHaveBeenCalledWith(socialLoginDto);
    });

    it("should throw an error if social login fails", async () => {
      // Arrange
      const socialLoginDto = {
        provider: "google",
        email: "test@example.com",
        name: "Test User",
      };

      mockAuthService.socialLogin.mockRejectedValue(new Error("Social login failed"));

      // Act & Assert
      await expect(controller.socialLogin(socialLoginDto)).rejects.toThrow("Social login failed");
      expect(mockAuthService.socialLogin).toHaveBeenCalledWith(socialLoginDto);
    });
  });

  describe("regenerateLicenseKey", () => {
    it("should regenerate a license key and return it", async () => {
      // Arrange
      const user: User = {
        id: "1",
        email: "test@example.com",
        password: "hashed-password",
        firstName: "Test",
        lastName: "User",
        licenseKey: "old-license-key",
        role: UserRole.CUSTOMER,
      };

      const newLicenseKey = { licenseKey: "new-license-key" };
      mockAuthService.regenerateLicenseKey.mockResolvedValue(newLicenseKey);

      // Act
      const result = await controller.regenerateLicenseKey(user);

      // Assert
      expect(result).toEqual(newLicenseKey);
      expect(mockAuthService.regenerateLicenseKey).toHaveBeenCalledWith(user.id);
    });

    it("should throw an error if regeneration fails", async () => {
      // Arrange
      const user: User = {
        id: "1",
        email: "test@example.com",
        password: "hashed-password",
        firstName: "Test",
        lastName: "User",
        licenseKey: "old-license-key",
        role: UserRole.CUSTOMER,
      };

      mockAuthService.regenerateLicenseKey.mockRejectedValue(new Error("Regeneration failed"));

      // Act & Assert
      await expect(controller.regenerateLicenseKey(user)).rejects.toThrow("Regeneration failed");
      expect(mockAuthService.regenerateLicenseKey).toHaveBeenCalledWith(user.id);
    });
  });

  describe("forgotPassword", () => {
    it("should initiate password reset and return a message", async () => {
      // Arrange
      const forgotPasswordDto: ForgotPasswordDto = {
        email: "test@example.com",
      };

      const response = { message: "If the email exists, a password reset link will be sent." };
      mockAuthService.forgotPassword.mockResolvedValue(response);

      // Act
      const result = await controller.forgotPassword(forgotPasswordDto);

      // Assert
      expect(result).toEqual(response);
      expect(mockAuthService.forgotPassword).toHaveBeenCalledWith(forgotPasswordDto.email);
    });

    it("should handle errors during password reset initiation", async () => {
      // Arrange
      const forgotPasswordDto: ForgotPasswordDto = {
        email: "test@example.com",
      };

      mockAuthService.forgotPassword.mockRejectedValue(new Error("Failed to initiate password reset"));

      // Act & Assert
      await expect(controller.forgotPassword(forgotPasswordDto)).rejects.toThrow("Failed to initiate password reset");
      expect(mockAuthService.forgotPassword).toHaveBeenCalledWith(forgotPasswordDto.email);
    });
  });

  describe("resetPassword", () => {
    it("should reset password and return a success message", async () => {
      // Arrange
      const resetPasswordDto: ResetPasswordDto = {
        token: "valid-reset-token",
        password: "newPassword123",
      };

      const response = { message: "Password has been reset successfully." };
      mockAuthService.resetPassword.mockResolvedValue(response);

      // Act
      const result = await controller.resetPassword(resetPasswordDto);

      // Assert
      expect(result).toEqual(response);
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(resetPasswordDto.token, resetPasswordDto.password);
    });

    it("should handle errors during password reset", async () => {
      // Arrange
      const resetPasswordDto: ResetPasswordDto = {
        token: "invalid-reset-token",
        password: "newPassword123",
      };

      mockAuthService.resetPassword.mockRejectedValue(new Error("Invalid or expired token"));

      // Act & Assert
      await expect(controller.resetPassword(resetPasswordDto)).rejects.toThrow("Invalid or expired token");
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(resetPasswordDto.token, resetPasswordDto.password);
    });
  });
});
