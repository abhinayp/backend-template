import { UserModel } from './user.model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  async findAll() {
    return await this.userModel.findAll()
  }
}
