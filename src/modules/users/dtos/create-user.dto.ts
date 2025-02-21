import { StringField } from "src/decorators/field.decorators";

export class CreateUserDto {
  @StringField()
  readonly email: string;

  @StringField()
  readonly password: string;

  @StringField()
  readonly fullName: string;

  @StringField()
  readonly phoneNumber: string;
}
