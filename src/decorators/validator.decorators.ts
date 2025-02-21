/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import {
  IsPhoneNumber as isPhoneNumber,
  registerDecorator,
  Validate,
  ValidateIf,
  ValidatorConstraint,
} from "class-validator";
import { startOfDay } from "date-fns";
import { isString } from "lodash";

@ValidatorConstraint({ name: "IsFutureTimestamp", async: false })
export class IsFutureTimestampConstraint implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    const options = args.constraints[0] || {};
    const now = Math.floor(Date.now() / 1000);

    if (options.sameDay) {
      const startToday = Math.floor(startOfDay(new Date()).getTime() / 1000);

      return value >= startToday;
    }

    return value >= now;
  }

  defaultMessage(args: ValidationArguments) {
    const options = args.constraints[0] || {};
    if (options.sameDay) {
      return "Timestamp must be within the same day";
    }
    return "Timestamp must be a future time";
  }
}

@ValidatorConstraint({ name: "IsFutureTimestampArray", async: false })
export class IsFutureTimestampArrayConstraint implements ValidatorConstraintInterface {
  validate(values: number[], _args: ValidationArguments) {
    if (!Array.isArray(values)) {
      return false;
    }
    if (values.length === 0) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);

    return values.every((value) => typeof value === "number" && value >= now);
  }

  defaultMessage(args: ValidationArguments) {
    if (!Array.isArray(args.value)) {
      return "Value must be an array of timestamps";
    }
    if (args.value.length === 0) {
      return "Array cannot be empty";
    }
    return "Each timestamp in the array must be a valid future time";
  }
}

export function IsPassword(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: "isPassword",
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
        },
      },
    });
  };
}

export function IsPhoneNumber(
  validationOptions?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
  },
): PropertyDecorator {
  return isPhoneNumber(validationOptions?.region, {
    message: "error.phoneNumber",
    ...validationOptions,
  });
}

export function IsTmpKey(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: "tmpKey",
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return isString(value) && value.startsWith("tmp/");
        },
        defaultMessage(): string {
          return "error.invalidTmpKey";
        },
      },
    });
  };
}

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== undefined, options);
}

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== null, options);
}

export function IsFutureTimestamp(
  options?: { sameDay?: boolean },
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      constraints: [options],
      validator: IsFutureTimestampConstraint,
    });
  };
}

export function IsFutureTimestampArray() {
  return Validate(IsFutureTimestampArrayConstraint);
}
