import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(14)
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  description: string;
}
