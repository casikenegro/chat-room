import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('my-user')
  myUser(@Req() request: any): Promise<any> {
    return this.usersService.myUser(request['user'].id);
  }
}
