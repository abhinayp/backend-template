import { Module, ModuleMetadata } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DatabaseModule } from '@/database/database.module'
import { UserModel } from './user.model'
import { BullModule } from '@nestjs/bull'

export const UserModuleConfig: ModuleMetadata = {
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'order'
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserModel],
}
@Module(UserModuleConfig)
export class UserModule { }
