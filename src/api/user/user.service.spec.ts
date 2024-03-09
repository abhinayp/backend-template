import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { UserModuleConfig } from './user.module';
import ConfigModule from '@/config';

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    UserModuleConfig.imports.push(ConfigModule)
    const module: TestingModule = await Test.createTestingModule(UserModuleConfig).compile()
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
