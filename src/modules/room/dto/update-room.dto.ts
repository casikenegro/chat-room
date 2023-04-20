import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty()
  createdAt?: Date | string;
  @ApiProperty()
  updatedAt?: Date | string;
  @ApiProperty()
  deletedAt?: Date | string;
}
