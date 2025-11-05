import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { generateAuthToken } from './auth.helpers';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  login(reqUser: User) {
    const authToken = generateAuthToken(reqUser, this.jwtService);
    const response = { token: authToken, user: reqUser };
    return response;
  }
}
