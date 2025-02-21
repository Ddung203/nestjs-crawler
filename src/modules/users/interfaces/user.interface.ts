import { Document } from "mongoose";

export interface User extends Document {
  readonly _id: string;
  readonly active: boolean;
  readonly avatarUrl: string;
  readonly birthday: string;
  readonly disabled: boolean;
  readonly email: string;
  readonly password: string;
  readonly fullName: string;
  readonly gender: string;
  readonly phoneNumber: string;
  readonly permanentAddress: string; // Dia chi thuong chu
  readonly role: string;
  createdAt: Date;
  updatedAt: Date;
}
