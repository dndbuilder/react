import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PagesService } from "./pages.service";
import { Page, PageDocument } from "./entities/page.entity";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { User, UserRole } from "../users/entities/user.entity";
import { NotFoundException, ConflictException } from "@nestjs/common";

describe("PagesService", () => {
  let service: PagesService;
  let model: Model<PageDocument>;

  const mockUser: User = {
    id: "user-id-1",
    email: "test@example.com",
    password: "password",
    firstName: "Test",
    lastName: "User",
    role: UserRole.CUSTOMER,
    licenseKey: "test-license-key",
  };

  const mockPage = {
    id: "page-id-1",
    name: "Test Page",
    description: "Test Description",
    userId: mockUser.id,
    content: { blocks: [] },
    save: jest.fn(),
  };

  const mockPageModel = {
    new: jest.fn().mockResolvedValue(mockPage),
    constructor: jest.fn().mockResolvedValue(mockPage),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    exec: jest.fn(),
    create: jest.fn().mockResolvedValue(mockPage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagesService,
        {
          provide: getModelToken(Page.name),
          useValue: mockPageModel,
        },
      ],
    }).compile();

    service = module.get<PagesService>(PagesService);
    model = module.get<Model<PageDocument>>(getModelToken(Page.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new page", async () => {
      // Arrange
      const createPageDto: CreatePageDto = {
        name: "Test Page",
        description: "Test Description",
        content: { blocks: [] },
      };

      // Mock findOne to return null (no existing page with the same name)
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // The create method is already defined in the mockPageModel object

      // Act
      const result = await service.create(createPageDto, mockUser);

      // Assert
      expect(result).toEqual(mockPage);
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        name: createPageDto.name,
        userId: mockUser.id,
      });
      expect(mockPageModel.create).toHaveBeenCalledWith({
        ...createPageDto,
        userId: mockUser.id,
      });
    });

    it("should throw ConflictException if page with same name already exists", async () => {
      // Arrange
      const createPageDto: CreatePageDto = {
        name: "Existing Page",
        description: "Test Description",
        content: { blocks: [] },
      };

      // Mock findOne to return an existing page
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPage),
      });

      // Act & Assert
      await expect(service.create(createPageDto, mockUser)).rejects.toThrow(
        ConflictException
      );
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        name: createPageDto.name,
        userId: mockUser.id,
      });
      expect(mockPageModel.create).not.toHaveBeenCalled();
    });

    it("should handle MongoDB duplicate key error", async () => {
      // Arrange
      const createPageDto: CreatePageDto = {
        name: "Test Page",
        description: "Test Description",
        content: { blocks: [] },
      };

      // Mock findOne to return null (no existing page with the same name)
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Mock create to throw a MongoDB duplicate key error
      const duplicateKeyError: any = new Error('Duplicate key error');
      duplicateKeyError.name = 'MongoServerError';
      duplicateKeyError.code = 11000;
      mockPageModel.create.mockRejectedValue(duplicateKeyError);

      // Act & Assert
      await expect(service.create(createPageDto, mockUser)).rejects.toThrow(
        ConflictException
      );
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        name: createPageDto.name,
        userId: mockUser.id,
      });
      expect(mockPageModel.create).toHaveBeenCalledWith({
        ...createPageDto,
        userId: mockUser.id,
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of pages for a user", async () => {
      // Arrange
      const mockPages = [mockPage];
      mockPageModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPages),
      });

      // Act
      const result = await service.findAll(mockUser.id);

      // Assert
      expect(result).toEqual(mockPages);
      expect(mockPageModel.find).toHaveBeenCalledWith({ userId: mockUser.id });
    });
  });

  describe("findOne", () => {
    it("should return a page by id", async () => {
      // Arrange
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPage),
      });

      // Act
      const result = await service.findOne(mockPage.id, mockUser.id);

      // Assert
      expect(result).toEqual(mockPage);
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        _id: mockPage.id,
        userId: mockUser.id,
      });
    });

    it("should throw NotFoundException if page is not found", async () => {
      // Arrange
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act & Assert
      await expect(service.findOne("nonexistent-id", mockUser.id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        _id: "nonexistent-id",
        userId: mockUser.id,
      });
    });
  });

  describe("update", () => {
    it("should update a page by id", async () => {
      // Arrange
      const updatePageDto: UpdatePageDto = {
        name: "Updated Page",
        description: "Updated Description",
      };

      // Mock findOne to return null (no existing page with the same name)
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      mockPageModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockPage,
          ...updatePageDto,
        }),
      });

      // Act
      const result = await service.update(mockPage.id, updatePageDto, mockUser.id);

      // Assert
      expect(result).toEqual({
        ...mockPage,
        ...updatePageDto,
      });
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        _id: { $ne: mockPage.id },
        name: updatePageDto.name,
        userId: mockUser.id,
      });
      expect(mockPageModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockPage.id, userId: mockUser.id },
        updatePageDto,
        { new: true }
      );
    });

    it("should throw ConflictException if page with same name already exists", async () => {
      // Arrange
      const updatePageDto: UpdatePageDto = {
        name: "Existing Page",
      };

      // Mock findOne to return an existing page
      const existingPage = { ...mockPage, id: "another-page-id" };
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingPage),
      });

      // Act & Assert
      await expect(
        service.update(mockPage.id, updatePageDto, mockUser.id)
      ).rejects.toThrow(ConflictException);
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        _id: { $ne: mockPage.id },
        name: updatePageDto.name,
        userId: mockUser.id,
      });
      expect(mockPageModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("should handle MongoDB duplicate key error during update", async () => {
      // Arrange
      const updatePageDto: UpdatePageDto = {
        name: "Updated Page",
      };

      // Mock findOne to return null (no existing page with the same name)
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Mock findOneAndUpdate to throw a MongoDB duplicate key error
      const duplicateKeyError: any = new Error('Duplicate key error');
      duplicateKeyError.name = 'MongoServerError';
      duplicateKeyError.code = 11000;
      mockPageModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockRejectedValue(duplicateKeyError),
      });

      // Act & Assert
      await expect(
        service.update(mockPage.id, updatePageDto, mockUser.id)
      ).rejects.toThrow(ConflictException);
      expect(mockPageModel.findOne).toHaveBeenCalledWith({
        _id: { $ne: mockPage.id },
        name: updatePageDto.name,
        userId: mockUser.id,
      });
      expect(mockPageModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockPage.id, userId: mockUser.id },
        updatePageDto,
        { new: true }
      );
    });

    it("should throw NotFoundException if page is not found", async () => {
      // Arrange
      const updatePageDto: UpdatePageDto = {
        name: "Updated Page",
      };

      // Mock findOne to return null (no existing page with the same name)
      mockPageModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      mockPageModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act & Assert
      await expect(
        service.update("nonexistent-id", updatePageDto, mockUser.id)
      ).rejects.toThrow(NotFoundException);
      expect(mockPageModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "nonexistent-id", userId: mockUser.id },
        updatePageDto,
        { new: true }
      );
    });
  });

  describe("remove", () => {
    it("should remove a page by id", async () => {
      // Arrange
      mockPageModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      // Act
      await service.remove(mockPage.id, mockUser.id);

      // Assert
      expect(mockPageModel.deleteOne).toHaveBeenCalledWith({
        _id: mockPage.id,
        userId: mockUser.id,
      });
    });

    it("should throw NotFoundException if page is not found", async () => {
      // Arrange
      mockPageModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      // Act & Assert
      await expect(service.remove("nonexistent-id", mockUser.id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockPageModel.deleteOne).toHaveBeenCalledWith({
        _id: "nonexistent-id",
        userId: mockUser.id,
      });
    });
  });
});
