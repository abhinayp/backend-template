import { Module, ModuleMetadata } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DatabaseModule } from '@/database/database.module'
import { UserModel } from './user.model'

export const UserModuleConfig: ModuleMetadata = {
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserModel],
}
@Module(UserModuleConfig)
export class UserModule {}
