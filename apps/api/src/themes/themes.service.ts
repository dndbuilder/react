import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Theme, ThemeDocument } from "./entities/theme.entity";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { SetActiveThemeDto } from "./dto/set-active-theme.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name)
    private themeModel: Model<ThemeDocument>
  ) {}

  async create(createThemeDto: CreateThemeDto, user: User): Promise<Theme> {
    try {
      // Check if a theme with the same name already exists for this user
      const existingTheme = await this.themeModel
        .findOne({
          name: createThemeDto.name,
          userId: user.id,
        })
        .exec();

      if (existingTheme) {
        throw new ConflictException(
          `A theme with the name "${createThemeDto.name}" already exists`
        );
      }

      // If isActive is true, deactivate all other themes for this user
      if (createThemeDto.isActive) {
        await this.deactivateAllThemes(user.id);
      }

      const createdTheme = await this.themeModel.create({
        ...createThemeDto,
        userId: user.id,
      });
      return createdTheme;
    } catch (error) {
      // Handle MongoDB duplicate key error (in case the check above fails due to race conditions)
      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new ConflictException(
          `A theme with the name "${createThemeDto.name}" already exists`
        );
      }
      throw error;
    }
  }

  async findActive(userId: string): Promise<Theme | null> {
    return this.themeModel.findOne({ userId, isActive: true }).exec();
  }

  async findOneOrFail(id: string, userId: string): Promise<Theme> {
    const theme = await this.themeModel.findOne({ _id: id, userId }).exec();
    if (!theme) {
      throw new NotFoundException("Theme not found");
    }
    return theme;
  }

  async findAll(userId: string): Promise<Theme[]> {
    return this.themeModel.find({ userId }).exec();
  }

  async update(id: string, updateThemeDto: UpdateThemeDto, userId: string): Promise<Theme> {
    try {
      // If the name is being updated, check for duplicates
      if (updateThemeDto.name) {
        const existingTheme = await this.themeModel
          .findOne({
            _id: { $ne: id }, // Exclude the current theme
            name: updateThemeDto.name,
            userId,
          })
          .exec();

        if (existingTheme) {
          throw new ConflictException(
            `A theme with the name "${updateThemeDto.name}" already exists`
          );
        }
      }

      // If isActive is being set to true, deactivate all other themes
      if (updateThemeDto.isActive === true) {
        await this.deactivateAllThemes(userId, id);
      }

      const theme = await this.themeModel
        .findOneAndUpdate({ _id: id, userId }, updateThemeDto, { new: true })
        .exec();

      if (!theme) {
        throw new NotFoundException("Theme not found");
      }

      return theme;
    } catch (error) {
      // Handle MongoDB duplicate key error (in case the check above fails due to race conditions)
      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new ConflictException(
          `A theme with the name "${updateThemeDto.name}" already exists`
        );
      }
      throw error;
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    const theme = await this.themeModel.findOne({ _id: id, userId }).exec();

    if (!theme) {
      throw new NotFoundException("Theme not found");
    }

    // Don't allow deletion of the active theme
    if (theme.isActive) {
      throw new ConflictException(
        "Cannot delete the active theme. Please activate another theme first."
      );
    }

    const result = await this.themeModel.deleteOne({ _id: id, userId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException("Theme not found");
    }
  }

  // Helper method to deactivate all themes for a user
  private async deactivateAllThemes(userId: string, excludeId?: string): Promise<void> {
    const query: any = { userId, isActive: true };

    // If excludeId is provided, don't deactivate that theme
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    await this.themeModel.updateMany(query, { isActive: false }).exec();
  }

  /**
   * Sets the active theme for a user.
   * If themeId is provided, it activates that theme.
   * If name and settings are provided, it creates a new active theme.
   */
  async setActiveTheme(setActiveThemeDto: SetActiveThemeDto, userId: string): Promise<Theme> {
    try {
      // Find the theme and ensure it belongs to the user
      const activeTheme = await this.findActive(userId);

      if (!activeTheme) {
        return this.themeModel.create({
          name: setActiveThemeDto.name,
          settings: setActiveThemeDto.settings,
          isActive: true,
          userId,
        });
      }

      const updated = await this.themeModel
        .findOneAndUpdate(
          { _id: activeTheme.id, userId },
          {
            name: setActiveThemeDto.name,
            settings: setActiveThemeDto.settings,
            isActive: true,
          },
          { new: true }
        )
        .exec();

      if (!updated) {
        throw new NotFoundException("Active theme not found");
      }

      return updated;
    } catch (error) {
      // Handle MongoDB duplicate key error (in case the check above fails due to race conditions)
      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new ConflictException(
          `A theme with the name "${setActiveThemeDto.name}" already exists`
        );
      }
      throw error;
    }
  }
}
