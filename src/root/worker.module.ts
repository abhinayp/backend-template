import { Module } from '@nestjs/common'
import ConfigModule from '@/config'
import { BullModule } from '@nestjs/bull'
import { OrderProcessor } from '@/processors/order.processor'

@Module({
  imports: [
    ConfigModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'order'
    })
  ],
  providers: [OrderProcessor],
})
export class WorkerModule { }
