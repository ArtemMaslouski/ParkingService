import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

interface UserPayload {
  id: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDto) {
    try {
      const { email, password } = registerDTO;

      const hashedPassword = await bcrypt.hash(password, 10);

      return this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch(error) {
      console.error(error)
      throw new Error('Во время регистрации произошла ошибка');
    }
  }

  async login(loginDTO: LoginDTO, @Req() req: Request, @Res() res: Response) {
    try {
      const { email, password } = loginDTO;
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).send({ message: 'Пользователя не существует' });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).send({ message: 'Неверный пароль' });
      }

      return this.createToken(user, res);
    } catch(error) {
      console.error(error)
      throw new Error(error)
    }
    
  }

  createToken(user: UserPayload, res: Response) {
    try {
      const isDev = process.env.NODE_ENV !== 'production';

      const payload = {
        sub: user.id,
        email: user.email,
      };

      const access_token = this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
        expiresIn: '30m',
      });

      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: !isDev,
        sameSite: isDev ? 'lax' : 'none',
        maxAge: 30 * 60 * 1000,
      });

      const refresh_token = this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY_REFRESH_TOKEN,
        expiresIn: '30d',
      });

      return res.status(200).json({
        access_token,
        refresh_token,
      });
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
