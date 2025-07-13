import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ThemesService } from "./themes.service";
import { Theme, ThemeDocument } from "./entities/theme.entity";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { User, UserRole } from "../users/entities/user.entity";
import { NotFoundException, ConflictException } from "@nestjs/common";

describe("ThemesService", () => {
  let service: ThemesService;
  let model: Model<ThemeDocument>;

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
    save: jest.fn(),
  };

  const mockThemeModel = {
    new: jest.fn().mockResolvedValue(mockTheme),
    constructor: jest.fn().mockResolvedValue(mockTheme),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    updateMany: jest.fn(),
    exec: jest.fn(),
    create: jest.fn().mockResolvedValue(mockTheme),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemesService,
        {
          provide: getModelToken(Theme.name),
          useValue: mockThemeModel,
        },
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
    model = module.get<Model<ThemeDocument>>(getModelToken(Theme.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new theme", async () => {
      // Arrange
      const createThemeDto: CreateThemeDto = {
        name: "Test Theme",
        settings: { colors: { primary: "#000000" } },
        isActive: false,
      };

      // Mock findOne to return null (no existing theme with the same name)
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Mock updateMany for deactivating other themes
      mockThemeModel.updateMany.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ modifiedCount: 0 }),
      });

      // Act
      const result = await service.create(createThemeDto, mockUser);

      // Assert
      expect(result).toEqual(mockTheme);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        name: createThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.create).toHaveBeenCalledWith({
        ...createThemeDto,
        userId: mockUser.id,
      });
      // Since isActive is false, updateMany should not be called
      expect(mockThemeModel.updateMany).not.toHaveBeenCalled();
    });

    it("should deactivate other themes when creating an active theme", async () => {
      // Arrange
      const createThemeDto: CreateThemeDto = {
        name: "Test Theme",
        settings: { colors: { primary: "#000000" } },
        isActive: true,
      };

      // Mock findOne to return null (no existing theme with the same name)
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Mock updateMany for deactivating other themes
      mockThemeModel.updateMany.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      });

      // Act
      const result = await service.create(createThemeDto, mockUser);

      // Assert
      expect(result).toEqual(mockTheme);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        name: createThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.updateMany).toHaveBeenCalledWith(
        { userId: mockUser.id, isActive: true },
        { isActive: false }
      );
      expect(mockThemeModel.create).toHaveBeenCalledWith({
        ...createThemeDto,
        userId: mockUser.id,
      });
    });

    it("should throw ConflictException if theme with same name already exists", async () => {
      // Arrange
      const createThemeDto: CreateThemeDto = {
        name: "Existing Theme",
        settings: { colors: { primary: "#000000" } },
        isActive: false,
      };

      // Mock findOne to return an existing theme
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTheme),
      });

      // Act & Assert
      await expect(service.create(createThemeDto, mockUser)).rejects.toThrow(ConflictException);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        name: createThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.create).not.toHaveBeenCalled();
    });

    it("should handle MongoDB duplicate key error", async () => {
      // Arrange
      const createThemeDto: CreateThemeDto = {
        name: "Test Theme",
        settings: { colors: { primary: "#000000" } },
        isActive: false,
      };

      // Mock findOne to return null (no existing theme with the same name)
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Mock create to throw a MongoDB duplicate key error
      const duplicateKeyError: any = new Error("Duplicate key error");
      duplicateKeyError.name = "MongoServerError";
      duplicateKeyError.code = 11000;
      mockThemeModel.create.mockRejectedValue(duplicateKeyError);

      // Act & Assert
      await expect(service.create(createThemeDto, mockUser)).rejects.toThrow(ConflictException);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        name: createThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.create).toHaveBeenCalledWith({
        ...createThemeDto,
        userId: mockUser.id,
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of themes for a user", async () => {
      // Arrange
      const mockThemes = [mockTheme];
      mockThemeModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockThemes),
      });

      // Act
      const result = await service.findAll(mockUser.id);

      // Assert
      expect(result).toEqual(mockThemes);
      expect(mockThemeModel.find).toHaveBeenCalledWith({ userId: mockUser.id });
    });
  });

  describe("findOneOrFail", () => {
    it("should return a theme by id", async () => {
      // Arrange
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTheme),
      });

      // Act
      const result = await service.findOneOrFail(mockTheme.id, mockUser.id);

      // Assert
      expect(result).toEqual(mockTheme);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: mockTheme.id,
        userId: mockUser.id,
      });
    });

    it("should throw NotFoundException if theme is not found", async () => {
      // Arrange
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act & Assert
      await expect(service.findOneOrFail("nonexistent-id", mockUser.id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: "nonexistent-id",
        userId: mockUser.id,
      });
    });
  });

  describe("findActive", () => {
    it("should return the active theme for a user", async () => {
      // Arrange
      const activeTheme = { ...mockTheme, isActive: true };
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(activeTheme),
      });

      // Act
      const result = await service.findActive(mockUser.id);

      // Assert
      expect(result).toEqual(activeTheme);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        userId: mockUser.id,
        isActive: true,
      });
    });

    it("should return null if no active theme is found", async () => {
      // Arrange
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act
      const result = await service.findActive(mockUser.id);

      // Assert
      expect(result).toBeNull();
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        userId: mockUser.id,
        isActive: true,
      });
    });
  });

  describe("update", () => {
    it("should update a theme by id", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Updated Theme",
        settings: { colors: { primary: "#FFFFFF" } },
      };

      // Mock findOne to return null (no existing theme with the same name)
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      mockThemeModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockTheme,
          ...updateThemeDto,
        }),
      });

      // Act
      const result = await service.update(mockTheme.id, updateThemeDto, mockUser.id);

      // Assert
      expect(result).toEqual({
        ...mockTheme,
        ...updateThemeDto,
      });
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: { $ne: mockTheme.id },
        name: updateThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockTheme.id, userId: mockUser.id },
        updateThemeDto,
        { new: true }
      );
    });

    it("should deactivate other themes when updating a theme to be active", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        isActive: true,
      };

      // Mock updateMany for deactivating other themes
      mockThemeModel.updateMany.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      });

      mockThemeModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockTheme,
          isActive: true,
        }),
      });

      // Act
      const result = await service.update(mockTheme.id, updateThemeDto, mockUser.id);

      // Assert
      expect(result).toEqual({
        ...mockTheme,
        isActive: true,
      });
      expect(mockThemeModel.updateMany).toHaveBeenCalledWith(
        { userId: mockUser.id, isActive: true, _id: { $ne: mockTheme.id } },
        { isActive: false }
      );
      expect(mockThemeModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockTheme.id, userId: mockUser.id },
        updateThemeDto,
        { new: true }
      );
    });

    it("should throw ConflictException if theme with same name already exists", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Existing Theme",
      };

      // Mock findOne to return an existing theme
      const existingTheme = { ...mockTheme, id: "another-theme-id" };
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingTheme),
      });

      // Act & Assert
      await expect(service.update(mockTheme.id, updateThemeDto, mockUser.id)).rejects.toThrow(
        ConflictException
      );
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: { $ne: mockTheme.id },
        name: updateThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("should handle MongoDB duplicate key error during update", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Updated Theme",
      };

      // Mock findOne to return null (no existing theme with the same name)
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Mock findOneAndUpdate to throw a MongoDB duplicate key error
      const duplicateKeyError: any = new Error("Duplicate key error");
      duplicateKeyError.name = "MongoServerError";
      duplicateKeyError.code = 11000;
      mockThemeModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockRejectedValue(duplicateKeyError),
      });

      // Act & Assert
      await expect(service.update(mockTheme.id, updateThemeDto, mockUser.id)).rejects.toThrow(
        ConflictException
      );
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: { $ne: mockTheme.id },
        name: updateThemeDto.name,
        userId: mockUser.id,
      });
      expect(mockThemeModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockTheme.id, userId: mockUser.id },
        updateThemeDto,
        { new: true }
      );
    });

    it("should throw NotFoundException if theme is not found", async () => {
      // Arrange
      const updateThemeDto: UpdateThemeDto = {
        name: "Updated Theme",
      };

      // Mock findOne to return null (no existing theme with the same name)
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      mockThemeModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act & Assert
      await expect(service.update("nonexistent-id", updateThemeDto, mockUser.id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockThemeModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "nonexistent-id", userId: mockUser.id },
        updateThemeDto,
        { new: true }
      );
    });
  });

  describe("remove", () => {
    it("should remove a theme by id", async () => {
      // Arrange
      // Mock findOne to return a non-active theme
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTheme),
      });

      mockThemeModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      // Act
      await service.remove(mockTheme.id, mockUser.id);

      // Assert
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: mockTheme.id,
        userId: mockUser.id,
      });
      expect(mockThemeModel.deleteOne).toHaveBeenCalledWith({
        _id: mockTheme.id,
        userId: mockUser.id,
      });
    });

    it("should throw ConflictException if trying to delete an active theme", async () => {
      // Arrange
      // Mock findOne to return an active theme
      const activeTheme = { ...mockTheme, isActive: true };
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(activeTheme),
      });

      // Act & Assert
      await expect(service.remove(mockTheme.id, mockUser.id)).rejects.toThrow(ConflictException);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: mockTheme.id,
        userId: mockUser.id,
      });
      expect(mockThemeModel.deleteOne).not.toHaveBeenCalled();
    });

    it("should throw NotFoundException if theme is not found", async () => {
      // Arrange
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act & Assert
      await expect(service.remove("nonexistent-id", mockUser.id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: "nonexistent-id",
        userId: mockUser.id,
      });
      expect(mockThemeModel.deleteOne).not.toHaveBeenCalled();
    });

    it("should throw NotFoundException if deleteOne returns deletedCount 0", async () => {
      // Arrange
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTheme),
      });

      mockThemeModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      // Act & Assert
      await expect(service.remove(mockTheme.id, mockUser.id)).rejects.toThrow(NotFoundException);
      expect(mockThemeModel.findOne).toHaveBeenCalledWith({
        _id: mockTheme.id,
        userId: mockUser.id,
      });
      expect(mockThemeModel.deleteOne).toHaveBeenCalledWith({
        _id: mockTheme.id,
        userId: mockUser.id,
      });
    });
  });
});
