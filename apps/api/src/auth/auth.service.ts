import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(createUserDto);
    const token = this.generateToken(user);

    return this.buildResponse(user, token);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      const isPasswordValid = await user.validatePassword(loginDto.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const token = this.generateToken(user);
      return this.buildResponse(user, token);
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async validateUser(userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  private buildResponse(user: User, token: string): AuthResponseDto {
    return new AuthResponseDto({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  }
}
