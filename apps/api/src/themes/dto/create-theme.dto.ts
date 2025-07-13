import { IsNotEmpty, IsString, IsObject, IsBoolean, IsOptional } from "class-validator";

export class CreateThemeDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsObject({ message: "Settings must be an object" })
  @IsNotEmpty({ message: "Settings are required" })
  settings: Record<string, any>;

  @IsBoolean({ message: "isActive must be a boolean" })
  @IsOptional()
  isActive?: boolean;
}