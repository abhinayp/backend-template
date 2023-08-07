import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@api/user/user.module';
import ConfigModule from '@/config';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
