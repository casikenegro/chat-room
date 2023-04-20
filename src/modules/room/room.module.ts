import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { DatabaseModule } from '../../database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomController],
  providers: [RoomService, JwtService],
})
export class RoomModule {}
