/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { generateHash, validateHash } from "src/common/utils";
import { AccountType } from "src/constants";
import { User } from "../interfaces/user.interface";

const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/upload-imgs-52a0d.appspot.com/o/images%2Flogo-D-noBGC.png?alt=media&token=c3bdc90f-29c9-4eea-9a63-0b979d14fb48&_gl=1*1jf57nf*_ga*OTc1MjA3NDA1LjE2OTQwODI3MDQ.*_ga_CW55HF8NVT*MTY5NjUwMjgzMC4xNi4xL jE2OTY1MDI4NDIuNDguMC4w";

export interface UserDocument extends User, Document {
  validatePassword(password: string): boolean;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    _id: { type: String, default: uuidv4 },
    active: { type: Boolean, default: false },
    avatarUrl: { type: String, default: defaultImage },
    birthday: { type: String, default: "01/01/2025" },
    disabled: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    phoneNumber: { type: String, required: true, unique: true },
    permanentAddress: { type: String, default: "" },
    role: { type: String, default: AccountType.USER },
  },
  { timestamps: true },
);

UserSchema.pre("save", function (next) {
  const user = this as any;

  // Kiểm tra nếu mật khẩu đã được thay đổi mới hash lại
  if (!user.isModified("password")) return next();

  try {
    user.password = generateHash(user.password);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.validatePassword = function (password: string): boolean {
  return validateHash(password, this.password);
};

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export { UserSchema };

UserSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.password = "hidden";
    return ret;
  },
});
