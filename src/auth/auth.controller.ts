import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    const { username, password } = body;
    return this.authService.register(username, password);
  }

  @Post('login')
  login(@Body() body: any) {
    const { username, password } = body;
    return this.authService.validateUser(username, password).then((user) => this.authService.login(user));
  }
}
