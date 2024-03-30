import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '@api/user/user.module'
import ConfigModule from '@/config'
import { DatabaseModule } from '@/database/database.module'
import { LoggerMiddleware } from '@/middleware/logger.middleware'
import { QueueModule } from '@/processors/queue.module'

@Module({
  imports: [
    UserModule, ConfigModule, DatabaseModule, QueueModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
