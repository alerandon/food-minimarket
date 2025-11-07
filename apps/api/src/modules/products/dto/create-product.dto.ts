import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsInt,
  IsPositive,
  IsUUID,
  IsOptional,
  Matches,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Saco 5 kgs de naranja',
    format: 'string',
    minLength: 3,
    maxLength: 100,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(100, { message: 'Name must be less than 100 characters' })
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Saco grande de naranjas frescas al mayor',
    format: 'string',
    maxLength: 500,
    required: false,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Description must be less than 500 characters' })
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: 12.99,
    type: Number,
    minimum: 0.01,
    maximum: 999999.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be greater than 0' })
  @Max(999999.99, { message: 'Price is too high' })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'PROD-12345',
    minLength: 3,
    maxLength: 50,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'SKU must be at least 3 characters' })
  @MaxLength(50, { message: 'SKU must be less than 50 characters' })
  @Matches(/^[A-Z0-9-]+$/, {
    message: 'SKU can only contain uppercase letters, numbers and hyphens',
  })
  sku: string;

  @ApiProperty({
    description: 'Product stock quantity',
    example: 100,
    type: Number,
    minimum: 0,
    maximum: 999999,
  })
  @IsInt({ message: 'Stock must be an integer' })
  @Min(0, { message: 'Stock cannot be negative' })
  @Max(999999, { message: 'Stock is too high' })
  @Type(() => Number)
  stock: number;

  @ApiProperty({
    description: 'Whether the product is available for sale',
    example: true,
    type: Boolean,
    default: true,
  })
  @Type(() => Boolean)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean({ message: 'isAvailable must be a boolean value' })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Store ID (optional for global products)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  storeId: string;
}
