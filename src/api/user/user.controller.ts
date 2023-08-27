import { Controller, Post, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller({
  version: ['1', '2'],
  path: 'user'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('get-all')
  async getAll() {
    return await this.userService.findAll();
  }
}
