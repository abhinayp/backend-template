import { Module } from '@nestjs/common'
import ConfigModule from '@/config'
import { QueueModule } from '@/processors/queue.module'
import { ConsumerModule } from '@/processors/consumer.module'

@Module({
  imports: [
    ConfigModule,
    QueueModule,
    ConsumerModule
  ],
})
export class WorkerModule { }
