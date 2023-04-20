import { DatabaseModule } from '../../../database/database.module';
import { JwtService } from '@nestjs/jwt';
import { RoomController } from './room.controller';
import { RoomService } from '../services/room.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RoomController', () => {
  let controller: RoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomService, JwtService],
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
