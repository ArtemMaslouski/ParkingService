import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Электронная почта пользователя' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  @IsNotEmpty()
  Password: string;
}
