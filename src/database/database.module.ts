import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserModel } from '../api/user/user.model';

@Module({
  providers: [
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders
  ],
})
export class DatabaseModule {}
