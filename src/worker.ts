import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { WorkerModule } from './root/worker.module'

async function bootstrap() {
  const logger = new Logger('main')
  await NestFactory.createApplicationContext(WorkerModule)
  logger.log('Worker started')
}
bootstrap()
