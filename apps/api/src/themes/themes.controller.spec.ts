import { Test, TestingModule } from "@nestjs/testing";
import { ThemesController } from "./themes.controller";
import { ThemesService } from "./themes.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { User, UserRole } from "../users/entities/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { Response } from "express";

describe("ThemesController", () => {
  let controller: ThemesController;
  let themesService: ThemesService;

  const mockUser: User = {
    id: "user-id-1",
    email: "test@example.com",
    password: "password",
    firstName: "Test",
    lastName: "User",
    role: UserRole.CUSTOMER,
    licenseKey: "test-license-key",
  };

  const mockTheme = {
    id: "theme-id-1",
    name: "Test Theme",
    settings: { colors: { primary: "#000000" } },
    isActive: false,
    userId: mockUser.id,
  };

  const mockThemesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneOrFail: jest.fn(),
    findActive: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [
        {
          provide: ThemesService,
          useValue: mockThemesService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ThemesController>(ThemesController);
    themesService = module.get<ThemesService>(ThemesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new theme", async () => {
      // Arrange
      const createThemeDto: CreateThemeDto = {
        name: "Test Theme",
        settings: { colors: { primary: "#000000" } },
        isActive: false,
      };

      mockThemesService.create.mockResolvedValue(mockTheme);

      // Act
      const result = await controller.create(createThemeDto, mockUser);

      // Assert
      expect(result).toEqual(mockTheme);
      expect(mockThemesService.create).toHaveBeenCalledWith(createThemeDto, mockUser);
    });

    it("should handle errors from service", async () => {
      // Arrange
      const createThemeDto: CreateThemeDto = {
        name: "Test Theme",
        settings: { colors: { primary: "#000000" } },
        isActive: false,
      };

      const error = new Error("Failed to create theme");
      mockThemesService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(createThemeDto, mockUser)).rejects.toThrow(error);
      expect(mockThemesService.create).toHaveBeenCalledWith(createThemeDto, mockUser);
    });
  });

  describe("findAll", () => {
    it("should return an array of themes", async () => {
      // Arrange
      const mockThemes = [mockTheme];
      mockThemesService.findAll.mockResolvedValue(mockThemes);

      // Act
      const result = await controller.findAll(mockUser);

      // Assert
      expect(result).toEqual(mockThemes);
      expect(mockThemesService.findAll).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe("findActive", () => {
    it("should return the active theme", async () => {
      // Arrange
      const activeTheme = { ...mockTheme, isActive: true };
      mockThemesService.findActive.mockResolvedValue(activeTheme);

      const mockResponse = {
        setHeader: jest.fn(),
        send: jest.fn()
      } as unknown as Response;

      // Act
      await controller.findActive(mockUser, mockResponse);

      // Assert
      expect(mockThemesService.findActive).toHaveBeenCalledWith(mockUser.id);
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(mockResponse.send).toHaveBeenCalledWith(JSON.stringify(activeTheme));
    });

    it("should return null if no active theme exists", async () => {
      // Arrange
      mockThemesService.findActive.mockResolvedValue(null);

      const mockResponse = {
        setHeader: jest.fn(),
        send: jest.fn()
      } as unknown as Response;

      // Act
      await controller.findActive(mockUser, mockResponse);

      // Assert
      expect(mockThemesService.findActive).toHaveBeenCalledWith(mockUser.id);
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(mockResponse.send).toHaveBeenCalledWith(JSON.stringify(null));
    });
  });

  describe("findOne", () => {
    it("should return a theme by id", async () => {
      // Arrange
      mockThemesService.findOneOrFail.mockResolvedValue(mockTheme);

      // Act
      const result = await controller.findOne(mockTheme.id, mockUser);

      // Assert
      expect(result).toEqual(mockTheme);
      expect(mockThemesService.findOneOrFail).toHaveBeenCalledWith(mockTheme.id, mockUser.id);
    });

    it("should throw NotFoundException if theme is not found", async () => {
      // Arrange
      mockThemesService.findOneOrFail.mockRejectedValue(new NotFoundException("Theme not found"));

      // Act & Assert
      await expect(controller.findOne("nonexistent-id", mockUser)).rejects.toThrow(
        NotFoundException
      );
      expect(mockThemesService.findOneOrFail).toHaveBeenCalledWith("nonexistent-id", mockUser.id);
    });
  });

  describe("update", () => {
    it("should update a theme by id", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Updated Theme",
        settings: { colors: { primary: "#FFFFFF" } },
      };

      const updatedTheme = {
        ...mockTheme,
        ...updateThemeDto,
      };

      mockThemesService.update.mockResolvedValue(updatedTheme);

      // Act
      const result = await controller.update(mockTheme.id, updateThemeDto, mockUser);

      // Assert
      expect(result).toEqual(updatedTheme);
      expect(mockThemesService.update).toHaveBeenCalledWith(
        mockTheme.id,
        updateThemeDto,
        mockUser.id
      );
    });

    it("should throw NotFoundException if theme is not found", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Updated Theme",
      };

      mockThemesService.update.mockRejectedValue(new NotFoundException("Theme not found"));

      // Act & Assert
      await expect(
        controller.update("nonexistent-id", updateThemeDto, mockUser)
      ).rejects.toThrow(NotFoundException);
      expect(mockThemesService.update).toHaveBeenCalledWith(
        "nonexistent-id",
        updateThemeDto,
        mockUser.id
      );
    });

    it("should handle ConflictException from service", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Existing Theme",
      };

      mockThemesService.update.mockRejectedValue(
        new ConflictException('A theme with the name "Existing Theme" already exists')
      );

      // Act & Assert
      await expect(
        controller.update(mockTheme.id, updateThemeDto, mockUser)
      ).rejects.toThrow(ConflictException);
      expect(mockThemesService.update).toHaveBeenCalledWith(
        mockTheme.id,
        updateThemeDto,
        mockUser.id
      );
    });
  });

  describe("remove", () => {
    it("should remove a theme by id", async () => {
      // Arrange
      mockThemesService.remove.mockResolvedValue(undefined);

      // Act
      await controller.remove(mockTheme.id, mockUser);

      // Assert
      expect(mockThemesService.remove).toHaveBeenCalledWith(mockTheme.id, mockUser.id);
    });

    it("should throw NotFoundException if theme is not found", async () => {
      // Arrange
      mockThemesService.remove.mockRejectedValue(new NotFoundException("Theme not found"));

      // Act & Assert
      await expect(controller.remove("nonexistent-id", mockUser)).rejects.toThrow(
        NotFoundException
      );
      expect(mockThemesService.remove).toHaveBeenCalledWith("nonexistent-id", mockUser.id);
    });

    it("should handle ConflictException when trying to delete an active theme", async () => {
      // Arrange
      mockThemesService.remove.mockRejectedValue(
        new ConflictException("Cannot delete the active theme. Please activate another theme first.")
      );

      // Act & Assert
      await expect(controller.remove(mockTheme.id, mockUser)).rejects.toThrow(
        ConflictException
      );
      expect(mockThemesService.remove).toHaveBeenCalledWith(mockTheme.id, mockUser.id);
    });
  });
});
