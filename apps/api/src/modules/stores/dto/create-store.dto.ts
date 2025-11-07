import { IsString, IsNotEmpty, MaxLength, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateStoreDto {
  @ApiProperty({
    description: 'Store name',
    example: 'Fresh Fruits Market',
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
    description: 'Store address',
    example: '123 Main Street, Downtown',
    minLength: 5,
    maxLength: 200,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Address must be at least 5 characters' })
  @MaxLength(200, { message: 'Address must be less than 200 characters' })
  address: string;

  @ApiProperty({
    description: 'City where the store is located',
    example: 'New York',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'City must be at least 2 characters' })
  @MaxLength(100, { message: 'City must be less than 100 characters' })
  city: string;

  @ApiProperty({
    description: 'Store contact phone number',
    example: '+1-555-0123',
    minLength: 7,
    maxLength: 20,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(7, { message: 'Phone must be at least 7 characters' })
  @MaxLength(20, { message: 'Phone must be less than 20 characters' })
  @Matches(/^[0-9+\-\s()]+$/, {
    message: 'Phone can only contain numbers, +, -, spaces and parentheses',
  })
  phone: string;
}
