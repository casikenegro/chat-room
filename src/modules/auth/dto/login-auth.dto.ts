import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(8)
  @MaxLength(14)
  @ApiProperty()
  password: string;
}
