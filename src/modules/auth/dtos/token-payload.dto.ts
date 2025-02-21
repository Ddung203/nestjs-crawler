import { StringField } from "src/decorators/field.decorators";

export class TokenPayloadDto {
  @StringField()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
