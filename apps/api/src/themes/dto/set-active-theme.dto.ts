import { IsNotEmpty, IsString, IsObject, IsOptional, ValidateIf } from "class-validator";

export class SetActiveThemeDto {
  @IsString({ message: "Id must be a string" })
  @IsOptional()
  id?: string;

  @ValidateIf((o) => !o.id)
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required when creating a new theme" })
  name?: string;

  @ValidateIf((o) => !o.id)
  @IsObject({ message: "Settings must be an object" })
  @IsNotEmpty({ message: "Settings are required when creating a new theme" })
  settings?: Record<string, unknown>;
}
