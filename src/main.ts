import { NestFactory } from '@nestjs/core';
import { AppModule } from './resources/app/app.module';
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'), () => {
    logger.log(`Server running on port ${configService.get('port')}`);
  });
}
bootstrap();
