/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a user' })
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.username, body.password);
  }

  @ApiOperation({ summary: 'Login a user' })
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService
      .validateUser(body.username, body.password)
      .then((user) => this.authService.login(user));
  }
}
