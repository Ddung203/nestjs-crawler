import { applyDecorators } from "@nestjs/common";
import type { ApiPropertyOptions } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
} from "class-validator";

import { PhoneNumberSerializer, ToArray, ToBoolean, ToLowerCase, ToUpperCase } from "./transform.decorators";
import {
  IsNullable,
  IsPassword,
  IsPhoneNumber,
  IsTmpKey as IsTemporaryKey,
  IsUndefinable,
} from "./validator.decorators";

interface IFieldOptions {
  each?: boolean;
  swagger?: boolean;
  nullable?: boolean;
  groups?: string[];
}

interface INumberFieldOptions extends IFieldOptions {
  min?: number;
  max?: number;
  int?: boolean;
  isPositive?: boolean;
}

interface IStringFieldOptions extends IFieldOptions {
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  allowEmpty?: boolean;
}

type IBooleanFieldOptions = IFieldOptions;

export function NumberField(options: Omit<ApiPropertyOptions, "type"> & INumberFieldOptions = {}): PropertyDecorator {
  const decorators = [Type(() => Number)];

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: Number }));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  if (options.int) {
    decorators.push(IsInt({ each: options.each }));
  } else {
    decorators.push(IsNumber({}, { each: options.each }));
  }

  if (typeof options.min === "number") {
    decorators.push(Min(options.min, { each: options.each }));
  }

  if (typeof options.max === "number") {
    decorators.push(Max(options.max, { each: options.each }));
  }

  if (options.isPositive) {
    decorators.push(IsPositive({ each: options.each }));
  }

  return applyDecorators(...decorators);
}

export function NumberFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required"> & INumberFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), NumberField({ required: false, ...options }));
}

export function StringField(options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {}): PropertyDecorator {
  const decorators = [Type(() => String), IsString({ each: options.each })];

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else if (!options.allowEmpty) {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        type: String,
        ...options,
        isArray: options.each,
        required: options.required as boolean,
      }),
    );
  }

  const minLength = options.allowEmpty ? 0 : options.minLength || 1;

  decorators.push(MinLength(minLength, { each: options.each }));

  if (options.maxLength) {
    decorators.push(MaxLength(options.maxLength, { each: options.each }));
  }

  if (options.toLowerCase) {
    decorators.push(ToLowerCase());
  }

  if (options.toUpperCase) {
    decorators.push(ToUpperCase());
  }

  return applyDecorators(...decorators);
}

export function StringFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required"> & IStringFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), StringField({ required: false, ...options }));
}

export function PasswordField(
  options: Omit<ApiPropertyOptions, "type" | "minLength"> & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [StringField({ ...options, minLength: 6 }), IsPassword()];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  return applyDecorators(...decorators);
}

export function PasswordFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required" | "minLength"> & IStringFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), PasswordField({ required: false, ...options }));
}

export function BooleanField(options: Omit<ApiPropertyOptions, "type"> & IBooleanFieldOptions = {}): PropertyDecorator {
  const decorators = [ToBoolean(), IsBoolean()];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: Boolean }));
  }

  return applyDecorators(...decorators);
}

export function BooleanFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required"> & IBooleanFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), BooleanField({ required: false, ...options }));
}

export function TmpKeyField(options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {}): PropertyDecorator {
  const decorators = [StringField(options), IsTemporaryKey({ each: options.each })];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: String, isArray: options.each }));
  }

  return applyDecorators(...decorators);
}

export function TmpKeyFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required"> & IStringFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), TmpKeyField({ required: false, ...options }));
}

export function EmailField(options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {}): PropertyDecorator {
  const decorators = [IsEmail(), StringField({ toLowerCase: true, ...options })];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: String }));
  }

  return applyDecorators(...decorators);
}

export function EmailFieldOptional(
  options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), EmailField({ required: false, ...options }));
}

export function PhoneField(options: Omit<ApiPropertyOptions, "type"> & IFieldOptions = {}): PropertyDecorator {
  const decorators = [IsPhoneNumber(), PhoneNumberSerializer()];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: String }));
  }

  return applyDecorators(...decorators);
}

export function PhoneFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required"> & IFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), PhoneField({ required: false, ...options }));
}

export function UUIDField(
  options: Omit<ApiPropertyOptions, "type" | "format" | "isArray"> & IFieldOptions = {},
): PropertyDecorator {
  const decorators = [Type(() => String), IsUUID("4", { each: options.each })];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: String }));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  return applyDecorators(...decorators);
}

export function UUIDFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required" | "isArray"> & IFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), UUIDField({ required: false, ...options }));
}

export function URLField(options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {}): PropertyDecorator {
  const decorators = [StringField(options), IsUrl({}, { each: true })];

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  return applyDecorators(...decorators);
}

export function URLFieldOptional(
  options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), URLField({ required: false, ...options }));
}

export function DateField(options: Omit<ApiPropertyOptions, "type"> & IFieldOptions = {}): PropertyDecorator {
  const decorators = [Type(() => Date), IsDate()];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: Date }));
  }

  return applyDecorators(...decorators);
}

export function DateFieldOptional(
  options: Omit<ApiPropertyOptions, "type" | "required"> & IFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(IsUndefinable(), DateField({ ...options, required: false }));
}
