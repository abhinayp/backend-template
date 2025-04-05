import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsumerModule } from './consumers/consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
        clientId: 'PROJECTNAME-client',
      }
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
