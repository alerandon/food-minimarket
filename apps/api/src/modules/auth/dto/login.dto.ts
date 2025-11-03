import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'demo@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    format: 'password',
  })
  @IsString({ message: 'Password must be a valid string' })
  password: string;
}
