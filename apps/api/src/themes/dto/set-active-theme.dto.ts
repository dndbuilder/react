import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class SetActiveThemeDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required when creating a new theme" })
  name: string;

  @IsObject({ message: "Settings must be an object" })
  @IsNotEmpty({ message: "Settings are required when creating a new theme" })
  settings: Record<string, unknown>;
}
