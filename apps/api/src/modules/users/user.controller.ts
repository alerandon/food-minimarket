import * as Swagger from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CurrentUserDocs } from './docs';

@Swagger.ApiTags('Users')
@Swagger.ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('current')
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiOperation(CurrentUserDocs.apiOperation)
  @Swagger.ApiResponse(CurrentUserDocs.apiResponseStatus200)
  currentUser(@Req() req) {
    const currentUserResponse = this.usersService.currentUser(req);
    const response = { data: currentUserResponse };
    return response;
  }
}
