import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
