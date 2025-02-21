import { StringField } from "src/decorators/field.decorators";

export class ChangePasswordDto {
  @StringField()
  readonly phoneNumber: string;

  @StringField()
  readonly oldPassword: string;

  @StringField()
  readonly newPassword: string;
}
