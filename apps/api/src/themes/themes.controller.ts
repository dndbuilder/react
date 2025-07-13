import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { User } from "../users/entities/user.entity";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { SetActiveThemeDto } from "./dto/set-active-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { Theme } from "./entities/theme.entity";
import { ThemesService } from "./themes.service";

@Controller("themes")
@UseGuards(JwtAuthGuard)
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  async create(@Body() createThemeDto: CreateThemeDto, @CurrentUser() user: User): Promise<Theme> {
    return this.themesService.create(createThemeDto, user);
  }

  @Get()
  async findAll(@CurrentUser() user: User): Promise<Theme[]> {
    return this.themesService.findAll(user.id);
  }

  @Get("active")
  async findActive(@CurrentUser() user: User, @Res() res: Response): Promise<void> {
    const theme = await this.themesService.findActive(user.id);
    res.status(200).json(theme);
  }

  @Post("active")
  async setActive(
    @Body() setActiveThemeDto: SetActiveThemeDto,
    @CurrentUser() user: User
  ): Promise<Theme> {
    return this.themesService.setActiveTheme(setActiveThemeDto, user.id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @CurrentUser() user: User): Promise<Theme> {
    return this.themesService.findOneOrFail(id, user.id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateThemeDto: UpdateThemeDto,
    @CurrentUser() user: User
  ): Promise<Theme> {
    return this.themesService.update(id, updateThemeDto, user.id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @CurrentUser() user: User): Promise<void> {
    return this.themesService.remove(id, user.id);
  }
}
