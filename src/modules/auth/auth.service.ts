import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!findUser) throw new HttpException('User not found', 404);
    const isPasswordValid = await compare(password, findUser.password);
    if (!isPasswordValid) throw new HttpException('Invalid password', 401);
    return {
      user: findUser,
      token: this.jwtService.sign({ id: findUser.id, name: findUser.name }),
    };
  }
  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainPassword = await hash(password, 10);
    return this.prisma.user.create({
      data: { ...new User({ ...registerAuthDto, password: plainPassword }) },
    });
  }
}
