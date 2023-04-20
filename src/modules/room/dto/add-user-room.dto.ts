import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUsersRoomDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  userId: string;
}
