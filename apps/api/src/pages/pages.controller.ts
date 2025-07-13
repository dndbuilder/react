import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from "@nestjs/common";
import { PagesService } from "./pages.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { Page } from "./entities/page.entity";

@Controller("pages")
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  async create(@Body() createPageDto: CreatePageDto, @CurrentUser() user: User): Promise<Page> {
    return this.pagesService.create(createPageDto, user);
  }

  @Get()
  async findAll(@CurrentUser() user: User): Promise<Page[]> {
    return this.pagesService.findAll(user.id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @CurrentUser() user: User): Promise<Page> {
    return this.pagesService.findOne(id, user.id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePageDto: UpdatePageDto,
    @CurrentUser() user: User
  ): Promise<Page> {
    return this.pagesService.update(id, updatePageDto, user.id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @CurrentUser() user: User): Promise<void> {
    return this.pagesService.remove(id, user.id);
  }
}
