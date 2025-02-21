/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable } from "@nestjs/common";
import { FilterQuery, FlattenMaps, Model } from "mongoose";

import { DATABASE } from "src/constants/mongoose";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE.MODELS.USER)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({ ...createUserDto });
    const newUser = await createdUser.save();

    return await this.userModel.findById(newUser._id).select("-password -__v").lean();
  }

  async findOne(filter: FilterQuery<UserDocument>): Promise<FlattenMaps<UserDocument> | null> {
    return await this.userModel.findOne(filter).select(" -__v").lean();
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ phoneNumber });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async updateUserPassword(id: string, newPassword: string) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { password: newPassword }, { new: true });

    return updatedUser;
  }
}
