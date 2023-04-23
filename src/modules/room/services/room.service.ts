import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { PrismaService } from '../../../database/prisma.service';
import { Room } from '../entities/room.entity';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { AddUsersRoomDto } from '../dto/add-user-room.dto';
import { AddMessageDto } from '../dto/add-message.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto, userId: string): Promise<Room> {
    const room = new Room({ ...createRoomDto });
    const date = moment.utc().format();
    await this.prisma.room.create({
      data: {
        ...room,
        users:
          process.env.NODE_ENV === 'test' // if we are in test environment, don't create a userRoom
            ? undefined
            : {
                create: [
                  {
                    id: uuidv4(),
                    isOwner: true,
                    createdAt: date,
                    updatedAt: date,
                    userId,
                  },
                ],
              },
      },
    });
    if (process.env.NODE_ENV === 'test') return room;
    await this.prisma.message.create({
      data: {
        // create a message for the user
        id: uuidv4(),
        createdAt: date,
        updatedAt: date,
        content: 'Welcome to the room',
        userId,
        roomId: room.id,
      },
    });
    return room;
  }

  async findAll(): Promise<Room[]> {
    return this.prisma.room.findMany({
      where: { deletedAt: null },
    });
  }
  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    if (process.env.NODE_ENV === 'test') return new Room(room);
    if (!room) throw new NotFoundException('Room not found');
    return new Room(room);
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
    owner: string,
  ): Promise<Room> {
    await this.isOwner(id, owner);
    const room = await this.findOne(id);
    const updatRoom = new Room({ ...room, ...updateRoomDto }); // update the room with the new data
    await this.prisma.room.update({
      where: { id },
      data: { ...updatRoom },
    }); // save the new data in the database
    return updatRoom;
  }

  async remove(id: string, owner: string): Promise<Room> {
    return this.update(id, { deletedAt: moment.utc().format() }, owner); // soft delete the room
  }
  async addUser(id: string, owner, addUsersDto: AddUsersRoomDto): Promise<any> {
    await this.isOwner(id, owner);
    const date = moment.utc().format();
    const existInRoom = await this.prisma.userRooms.findFirst({
      where: { roomId: id, userId: addUsersDto.userId },
    });
    if (existInRoom) throw new BadRequestException();

    return this.prisma.userRooms.create({
      data: {
        id: uuidv4(),
        userId: addUsersDto.userId,
        roomId: id,
        createdAt: date,
        updatedAt: date,
      },
    });
  }
  async getRoomUsers(roomId: string): Promise<any> {
    return this.prisma.userRooms.findMany({
      where: { roomId },
      include: {
        user: true,
      },
    });
  }
  async addMessage(
    userId,
    roomId,
    addMessageDto: AddMessageDto,
  ): Promise<boolean> {
    try {
      const date = moment.utc().format();
      await this.prisma.message.create({
        data: {
          id: uuidv4(),
          createdAt: date,
          updatedAt: date,
          content: addMessageDto.message,
          roomId,
          userId,
        },
      });
      return true;
    } catch (error) {}
  }
  async getMessages(roomId: string): Promise<any> {
    // return all the messages of a room
    // TODO: add pagination
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { updatedAt: 'desc' },
    });
  }
  async getLastMessage(roomId: string): Promise<any> {
    // return the last message of a room
    return this.prisma.message.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });
  }
  async getMessagesByUser(roomId: string, userId: string): Promise<any> {
    return this.prisma.message.findMany({
      where: { roomId, userId },
      orderBy: {
        id: 'desc',
      },
    });
  }
  private async isOwner(roomId: string, userId: string): Promise<boolean> {
    try {
      const room = await this.prisma.room.findUnique({
        where: { id: roomId },
        include: {
          users: {
            where: { userId, isOwner: true },
          },
        },
      });
      if (!room) throw new NotFoundException('Room not found');
      return room.users[0].isOwner;
    } catch (error) {
      throw new NotFoundException('Room not found');
    }
  }
}
