import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '@api/user/user.module'
import ConfigModule from '@/config'
import { DatabaseModule } from '@/database/database.module'
import { LoggerMiddleware } from '@/middleware/logger.middleware'
import { BullModule } from '@nestjs/bull'
import { OrderProcessor } from '@/processors/order.processor'

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    UserModule, ConfigModule, DatabaseModule
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
