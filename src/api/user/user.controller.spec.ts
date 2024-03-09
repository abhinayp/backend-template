import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserModuleConfig } from './user.module'
import ConfigModule from '@/config'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    UserModuleConfig.imports.push(ConfigModule)
    const module: TestingModule = await Test.createTestingModule(
      UserModuleConfig
    ).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
