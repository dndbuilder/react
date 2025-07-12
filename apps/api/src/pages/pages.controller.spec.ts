import { Test, TestingModule } from "@nestjs/testing";
import { PagesController } from "./pages.controller";
import { PagesService } from "./pages.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { User, UserRole } from "../users/entities/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { NotFoundException } from "@nestjs/common";

describe("PagesController", () => {
  let controller: PagesController;
  let pagesService: PagesService;

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
  };

  const mockPagesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [
        {
          provide: PagesService,
          useValue: mockPagesService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PagesController>(PagesController);
    pagesService = module.get<PagesService>(PagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new page", async () => {
      // Arrange
      const createPageDto: CreatePageDto = {
        name: "Test Page",
        description: "Test Description",
        content: { blocks: [] },
      };

      mockPagesService.create.mockResolvedValue(mockPage);

      // Act
      const result = await controller.create(createPageDto, mockUser);

      // Assert
      expect(result).toEqual(mockPage);
      expect(mockPagesService.create).toHaveBeenCalledWith(createPageDto, mockUser);
    });

    it("should handle errors from service", async () => {
      // Arrange
      const createPageDto: CreatePageDto = {
        name: "Test Page",
        description: "Test Description",
        content: { blocks: [] },
      };

      const error = new Error("Failed to create page");
      mockPagesService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(createPageDto, mockUser)).rejects.toThrow(error);
      expect(mockPagesService.create).toHaveBeenCalledWith(createPageDto, mockUser);
    });
  });

  describe("findAll", () => {
    it("should return an array of pages", async () => {
      // Arrange
      const mockPages = [mockPage];
      mockPagesService.findAll.mockResolvedValue(mockPages);

      // Act
      const result = await controller.findAll(mockUser);

      // Assert
      expect(result).toEqual(mockPages);
      expect(mockPagesService.findAll).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe("findOne", () => {
    it("should return a page by id", async () => {
      // Arrange
      mockPagesService.findOne.mockResolvedValue(mockPage);

      // Act
      const result = await controller.findOne(mockPage.id, mockUser);

      // Assert
      expect(result).toEqual(mockPage);
      expect(mockPagesService.findOne).toHaveBeenCalledWith(mockPage.id, mockUser.id);
    });

    it("should throw NotFoundException if page is not found", async () => {
      // Arrange
      mockPagesService.findOne.mockRejectedValue(new NotFoundException("Page not found"));

      // Act & Assert
      await expect(controller.findOne("nonexistent-id", mockUser)).rejects.toThrow(
        NotFoundException
      );
      expect(mockPagesService.findOne).toHaveBeenCalledWith("nonexistent-id", mockUser.id);
    });
  });

  describe("update", () => {
    it("should update a page by id", async () => {
      // Arrange
      const updatePageDto: UpdatePageDto = {
        name: "Updated Page",
        description: "Updated Description",
      };

      const updatedPage = {
        ...mockPage,
        ...updatePageDto,
      };

      mockPagesService.update.mockResolvedValue(updatedPage);

      // Act
      const result = await controller.update(mockPage.id, updatePageDto, mockUser);

      // Assert
      expect(result).toEqual(updatedPage);
      expect(mockPagesService.update).toHaveBeenCalledWith(
        mockPage.id,
        updatePageDto,
        mockUser.id
      );
    });

    it("should throw NotFoundException if page is not found", async () => {
      // Arrange
      const updatePageDto: UpdatePageDto = {
        name: "Updated Page",
      };

      mockPagesService.update.mockRejectedValue(new NotFoundException("Page not found"));

      // Act & Assert
      await expect(
        controller.update("nonexistent-id", updatePageDto, mockUser)
      ).rejects.toThrow(NotFoundException);
      expect(mockPagesService.update).toHaveBeenCalledWith(
        "nonexistent-id",
        updatePageDto,
        mockUser.id
      );
    });
  });

  describe("remove", () => {
    it("should remove a page by id", async () => {
      // Arrange
      mockPagesService.remove.mockResolvedValue(undefined);

      // Act
      await controller.remove(mockPage.id, mockUser);

      // Assert
      expect(mockPagesService.remove).toHaveBeenCalledWith(mockPage.id, mockUser.id);
    });

    it("should throw NotFoundException if page is not found", async () => {
      // Arrange
      mockPagesService.remove.mockRejectedValue(new NotFoundException("Page not found"));

      // Act & Assert
      await expect(controller.remove("nonexistent-id", mockUser)).rejects.toThrow(
        NotFoundException
      );
      expect(mockPagesService.remove).toHaveBeenCalledWith("nonexistent-id", mockUser.id);
    });
  });
});
