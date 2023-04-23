import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomService } from '../services/room.service';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { AddUsersRoomDto } from '../dto/add-user-room.dto';
import { AddMessageDto } from '../dto/add-message.dto';

@Controller('room')
@ApiTags('room')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'create room' })
  create(@Req() request: any, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto, request['user'].id);
  }

  @Get()
  @ApiOperation({ summary: 'list rooms' })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one room' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update one room' })
  update(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, updateRoomDto, request['user'].id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'soft delete one room' })
  remove(@Req() request: any, @Param('id') id: string) {
    return this.roomService.remove(id, request['user'].id);
  }

  @Post('members/:room_id')
  @ApiOperation({ summary: 'add user to room' })
  addUser(
    @Req() request: any,
    @Param('room_id') roomId: string,
    @Body() addUsersDto: AddUsersRoomDto,
  ) {
    return this.roomService.addUser(roomId, request['user'].id, addUsersDto);
  }

  @Get('members/:room_id')
  @ApiOperation({ summary: 'get users in the room' })
  getRoomUsers(@Param('room_id') roomId: string) {
    return this.roomService.getRoomUsers(roomId);
  }

  @Get('messages/:room_id')
  @ApiOperation({ summary: 'get all messages in room' })
  getMessages(@Param('room_id') roomId: string) {
    return this.roomService.getMessages(roomId);
  }

  @Get('messages/:room_id/last-message')
  @ApiOperation({ summary: 'get all messages in room' })
  getLastMessage(@Param('room_id') roomId: string) {
    return this.roomService.getLastMessage(roomId);
  }

  @Post('messages/:room_id')
  @ApiOperation({ summary: 'add message in room' })
  addMessage(
    @Req() request: any,
    @Param('room_id') roomId: string,
    @Body() addMessageDto: AddMessageDto,
  ) {
    return this.roomService.addMessage(request.user.id, roomId, addMessageDto);
  }
  @Get('messages/:room_id/user')
  @ApiOperation({ summary: 'get all messages by user in room' })
  getMessagesByUser(@Param('room_id') roomId: string, @Req() request: any) {
    return this.roomService.getMessagesByUser(roomId, request.user.id);
  }
}
