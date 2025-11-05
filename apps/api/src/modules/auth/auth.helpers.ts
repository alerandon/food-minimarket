import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { TJwtPayload } from './dto';

export function generateAuthToken(user: User, jwtService: JwtService) {
  const inputPayload: TJwtPayload = {
    id: user.id,
    email: user.email,
    type: 'auth',
  };
  const token = jwtService.sign(inputPayload);
  return token;
}
