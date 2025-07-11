import { IsEmail, IsString, IsOptional } from "class-validator";

export class UpdateProfileDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsOptional()
  email?: string;

  @IsString({ message: "First name must be a string" })
  @IsOptional()
  firstName?: string;

  @IsString({ message: "Last name must be a string" })
  @IsOptional()
  lastName?: string;

  @IsString({ message: "Image must be a string" })
  @IsOptional()
  image?: string;
}
