import { StringField } from "src/decorators/field.decorators";

export class SignInDto {
  @StringField()
  readonly phoneNumber: string;

  @StringField()
  readonly password: string;
}
