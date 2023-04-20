import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async myUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
