import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { PrismaService } from '../../../database/prisma.service';
import { Room } from '../entities/room.entity';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

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
                    messages: {
                      // create a message for the user
                      create: {
                        id: uuidv4(),
                        createdAt: date,
                        updatedAt: date,
                        content: 'Welcome to the room',
                      },
                    },
                  },
                ],
              },
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
  async addUsers(id: string, owner, userIds: string[]): Promise<Room> {
    await this.isOwner(id, owner);
    const date = moment.utc().format();
    await this.prisma.room.update({
      where: { id },
      data: {
        users: {
          create: userIds.map((userId) => ({
            id: uuidv4(),
            createdAt: date,
            updatedAt: date,
            userId,
            roomId: id,
          })),
        },
      },
    });
    return this.findOne(id);
  }
  async addMessage(userRoomId: string, content: string): Promise<boolean> {
    try {
      const date = moment.utc().format();
      await this.prisma.message.create({
        data: {
          id: uuidv4(),
          createdAt: date,
          updatedAt: date,
          content,
          userRoomId,
        },
      });
      return true;
    } catch (error) {}
  }
  async getMessages(roomId: string): Promise<any> {
    // return all the messages of a room
    // TODO: add pagination
    return this.prisma.room.findMany({
      where: { id: roomId },
      include: {
        users: {
          include: {
            messages: {
              orderBy: {
                updatedAt: 'desc',
              },
            },
          },
        },
      },
    });
  }
  async getLastMessage(roomId: string): Promise<any> {
    // return the last message of a room
    return this.prisma.room.findMany({
      where: { id: roomId },
      include: {
        users: {
          include: {
            messages: {
              orderBy: {
                updatedAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });
  }
  async getMessagesByUser(roomId: string, userId: string): Promise<any> {
    return this.prisma.room.findMany({
      where: { id: roomId },
      include: {
        users: {
          where: { userId },
          include: { messages: true },
        },
      },
    });
  }
  private async isOwner(roomId: string, userId: string): Promise<boolean> {
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
  }
}
