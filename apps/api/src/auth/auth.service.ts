import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { SocialLoginDto } from "./dto/social-login.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(createUserDto);
    const token = this.generateToken(user);

    return this.buildResponse(user, token);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.usersService.findByEmailOrFail(loginDto.email);

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const token = this.generateToken(user);
      return this.buildResponse(user, token);
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async socialLogin(loginDto: SocialLoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);

      if (!user) {
        const names = loginDto.name?.split(" ") || [];
        const firstName = names[0] || "User";
        const lastName = names.slice(1).join(" ") || "";

        // Generate a random password for social users
        const password = Math.random().toString(36).slice(-10);

        // If user does not exist, create a new one
        const newUser = await this.usersService.create({
          email: loginDto.email,
          password, // Use a random password for social login
          firstName,
          lastName,
        });

        const token = this.generateToken(newUser);
        return this.buildResponse(newUser, token);
      }

      // If user exists, generate a token
      const token = this.generateToken(user);
      return this.buildResponse(user, token);
    } catch (error) {
      throw new UnauthorizedException("Social authentication failed");
    }
  }

  async validateUser(userId: string): Promise<User> {
    return this.usersService.findByIdOrFail(userId);
  }

  async regenerateLicenseKey(userId: string): Promise<{ licenseKey: string }> {
    const user = await this.usersService.regenerateLicenseKey(userId);
    return { licenseKey: user.licenseKey };
  }

  async updateProfile(userId: string, updateData: Partial<User>): Promise<Omit<User, "password">> {
    const user = await this.usersService.updateProfile(userId, updateData);
    const { password, ...result } = user.toJSON();
    return result as Omit<User, "password">;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      // Generate and save reset token
      const { token } = await this.usersService.setPasswordResetToken(email);

      // Get user information for the email
      const user = await this.usersService.findByEmailOrFail(email);

      // Send email with reset link using the mail service
      await this.mailService.sendPasswordResetEmail(email, user.firstName, token);

      return {
        message: "If the email exists, a password reset link will be sent."
      };
    } catch (error) {
      // We don't want to reveal if an email exists or not for security reasons
      // So we return a generic message even if the email doesn't exist
      return {
        message: "If the email exists, a password reset link will be sent."
      };
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    await this.usersService.resetPassword(token, newPassword);

    return {
      message: "Password has been reset successfully."
    };
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
      licenseKey: user.licenseKey,
      token,
    });
  }
}
