import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { PrismaService } from '../../../database/prisma.service';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: { ...new Room(createRoomDto) },
    });
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
