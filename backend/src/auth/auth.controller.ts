import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { Request, Response } from 'express';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  async login(
    @Body() loginDto: LoginDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.login(loginDto, req, res);
  }
}
