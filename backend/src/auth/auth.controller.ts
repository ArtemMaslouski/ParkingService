import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.login(loginDto, req, res);
  }
}
