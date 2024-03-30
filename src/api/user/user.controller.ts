import { Controller, Post, Version } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@ApiTags('user')
@Controller({
  version: ['1'],
  path: 'user',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectQueue('order') private orderQueue: Queue
  ) { }

  @Post('get-all')
  async getAll() {
    await this.orderQueue.add('test', { data: 'some data' })
    return await this.userService.findAll()
  }
}
