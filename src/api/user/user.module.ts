import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/database/database.module';
import { UserModel } from './user.model';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserModel]
})
export class UserModule {}
