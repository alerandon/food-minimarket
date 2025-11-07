import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    description: 'Store name',
    example: 'Fresh Fruits Market',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Store address',
    example: '123 Main Street, Downtown',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'City where the store is located',
    example: 'New York',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city: string;

  @ApiProperty({
    description: 'Store contact phone number',
    example: '+1-555-0123',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  phone: string;
}
