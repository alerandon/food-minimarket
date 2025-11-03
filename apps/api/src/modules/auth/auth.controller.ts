import * as Swagger from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { LoginDto } from './dto';
import { LoginDocs } from './docs';

@Swagger.ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @Swagger.ApiOperation(LoginDocs.apiOperation)
  @Swagger.ApiResponse(LoginDocs.apiResponseStatus201)
  @Swagger.ApiResponse(LoginDocs.apiResponseStatus401)
  @Swagger.ApiBody(LoginDocs.apiBody)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req, @Body() loginDto: LoginDto) {
    const reqUser = req.user as User;
    const loginResponse = this.authService.login(reqUser);
    const response = { data: loginResponse };
    return response;
  }
}
