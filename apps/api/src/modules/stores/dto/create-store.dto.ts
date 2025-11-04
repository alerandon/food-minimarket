import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city: string;

  @IsString()
  @MaxLength(20)
  phone: string;
}
