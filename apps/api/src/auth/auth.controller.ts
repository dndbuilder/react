import { Controller, Post, Body, Get, UseGuards, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { SocialLoginDto } from "./dto/social-login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@CurrentUser() user: User): Promise<Omit<User, "password">> {
    const { password, ...result } = user;
    return result;
  }

  @Post("social-login")
  async socialLogin(@Body() loginDto: SocialLoginDto): Promise<AuthResponseDto> {
    return this.authService.socialLogin(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put("regenerate-license-key")
  async regenerateLicenseKey(@CurrentUser() user: User): Promise<{ licenseKey: string }> {
    return this.authService.regenerateLicenseKey(user.id);
  }
}
