import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument, generateLicenseKey } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByIdOrFail(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmailOrFail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async regenerateLicenseKey(userId: string): Promise<UserDocument> {
    const user = await this.findByIdOrFail(userId);
    user.licenseKey = generateLicenseKey();
    return user.save();
  }

  async updateProfile(userId: string, updateData: Partial<User>): Promise<UserDocument> {
    const user = await this.findByIdOrFail(userId);

    // Update only the fields that are provided
    if (updateData.email !== undefined) {
      // Check if email is already taken by another user
      if (updateData.email !== user.email) {
        const existingUser = await this.userModel.findOne({ email: updateData.email }).exec();
        if (existingUser) {
          throw new ConflictException("Email already exists");
        }
        user.email = updateData.email;
      }
    }

    if (updateData.firstName !== undefined) {
      user.firstName = updateData.firstName;
    }

    if (updateData.lastName !== undefined) {
      user.lastName = updateData.lastName;
    }

    if (updateData.image !== undefined) {
      user.image = updateData.image;
    }

    return user.save();
  }

  async remove(id: string): Promise<UserDocument | null> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async removeAll(): Promise<void> {
    await this.userModel.deleteMany({}).exec();
  }
}
