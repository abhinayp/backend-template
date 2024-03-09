import { Inject, Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { User } from '../../database/entities/user.entity'

@Injectable()
export class UserModel {
  private userRepository: Repository<User> = this.dataSource.getRepository(User)
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
