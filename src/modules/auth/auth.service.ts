import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  create(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }
  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainPassword = await hash(password);
    return this.prisma.user.create({
      data: new User({ ...registerAuthDto, password: plainPassword }),
    });
  }
}
