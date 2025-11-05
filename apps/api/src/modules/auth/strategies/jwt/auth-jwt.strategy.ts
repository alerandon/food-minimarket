import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { TJwtPayload } from '../../dto';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.API_JWT_SECRET!,
    });
  }

  async validate(payload: TJwtPayload) {
    const user = await this.usersRepository.findOneBy({ email: payload.email });
    const isTokenInvalid = payload.type !== 'auth' || !user;
    if (isTokenInvalid) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
