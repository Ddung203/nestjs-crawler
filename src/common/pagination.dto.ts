import { Model } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { NumberFieldOptional } from "src/decorators/field.decorators";

export class PaginationDto {
  @NumberFieldOptional({ int: true, min: 1 })
  page?: number = 1;

  @NumberFieldOptional({ int: true, min: 1, max: 200 })
  pageSize?: number = 10;
}

export async function paginate<T>(
  model: Model<T>,
  page: number = 1,
  pageSize: number = 10,
  query: Record<string, any> = {},
  projection: Record<string, any> = {},
  options: Record<string, any> = {},
) {
  const [items, totalItems] = await Promise.all([
    model
      .find(query, projection, options)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec(),
    model.countDocuments(query).exec(),
  ]);

  return new PaginationResponseDto<T>({
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
    pageSize,
    currentPage: page,
    data: items,
  });
}

export class PaginationResponseDto<T> {
  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ isArray: true })
  data: T[];

  constructor(partial: Partial<PaginationResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
