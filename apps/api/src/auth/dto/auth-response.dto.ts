import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../../users/entities/user.entity";

export class AuthResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: UserRole;

  @Exclude()
  password?: string;

  @Expose()
  token: string;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}
