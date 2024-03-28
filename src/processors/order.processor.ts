import { Process } from '@nestjs/bull';
import { Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('order')
export class OrderProcessor {
  private readonly logger = new Logger(OrderProcessor.name);

  @Process("test")
  async test(job: Job<object>): Promise<any> {
    this.logger.log(`start Processing job ${job.id} of type ${job.name} ${JSON.stringify(job.data)}`);
    await new Promise((resolve) => setTimeout(resolve, 25000));
    this.logger.log(`end Processing job ${job.id} of type ${job.name} ${JSON.stringify(job.data)}`);
  }
}
