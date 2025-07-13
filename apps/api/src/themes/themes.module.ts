import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Theme, ThemeSchema } from "./entities/theme.entity";
import { ThemesService } from "./themes.service";
import { ThemesController } from "./themes.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }])],
  controllers: [ThemesController],
  providers: [ThemesService],
  exports: [ThemesService],
})
export class ThemesModule {}
