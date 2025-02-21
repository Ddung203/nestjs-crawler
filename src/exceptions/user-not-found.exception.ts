import { NotFoundException } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    const i18n = I18nContext.current();
    const message = i18n?.translate("errors.userNotFound");
    super(message);
  }
}
