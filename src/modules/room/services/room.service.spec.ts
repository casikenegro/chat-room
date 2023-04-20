import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from '../services/room.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../../database/database.module';
import { v4 as uuidv4 } from 'uuid';
describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService, JwtService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return room object', async () => {
    const room = await service.create(
      {
        title: 'Test Room',
        description: 'Test Room Description',
      },
      uuidv4(),
    );
    expect(room).toMatchObject({
      id: expect.any(String),
      title: 'Test Room',
      description: 'Test Room Description',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: null,
    });
  });

  it('should return rooms', async () => {
    const rooms = await service.findAll();
    expect(rooms).toEqual(expect.any(Array));
  });

  it('should return room', async () => {
    const room = await service.findOne(uuidv4());
    expect(room).toEqual(expect.any(Object));
  });
  it('should return room', async () => {
    const room = await service.findOne(uuidv4());
    expect(room).toEqual(expect.any(Object));
  });
});
