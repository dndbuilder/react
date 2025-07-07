import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { User, UserRole } from "../users/entities/user.entity";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UnauthorizedException } from "@nestjs/common";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
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
        role: UserRole.CUSTOMER,
        validatePassword: async () => true,
      };

      // Act
      const result = await controller.getProfile(user);

      // Assert
      expect(result).toEqual({
        id: "1",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        role: UserRole.CUSTOMER,
      });
      expect(result).not.toHaveProperty("password");
      expect(result).not.toHaveProperty("validatePassword");
    });
  });
});
