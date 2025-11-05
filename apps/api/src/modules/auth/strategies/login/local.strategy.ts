import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ email });
    const validatedPassword = await user?.validatePassword(password);

    if (!user || !validatedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
