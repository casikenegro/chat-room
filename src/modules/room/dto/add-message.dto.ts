import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddMessageDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  message: string;
}
