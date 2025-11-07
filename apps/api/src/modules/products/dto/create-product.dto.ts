import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  IsInt,
  IsPositive,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Saco 5 kgs de naranja',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Saco grande de naranjas frescas al mayor',
    format: 'string',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: 12.99,
    type: Number,
    minimum: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'PROD-12345',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @ApiProperty({
    description: 'Product stock quantity',
    example: 100,
    type: Number,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({
    description: 'Store ID (optional for global products)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  storeId: string;
}
