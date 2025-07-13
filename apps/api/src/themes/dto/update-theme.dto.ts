import { IsString, IsObject, IsBoolean, IsOptional } from "class-validator";

export class UpdateThemeDto {
  @IsString({ message: "Name must be a string" })
  @IsOptional()
  name?: string;

  @IsObject({ message: "Settings must be an object" })
  @IsOptional()
  settings?: Record<string, any>;

  @IsBoolean({ message: "isActive must be a boolean" })
  @IsOptional()
  isActive?: boolean;
}