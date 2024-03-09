import { NestFactory } from '@nestjs/core'
import { AppModule } from './root/app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const logger = new Logger('main')
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableVersioning({
    type: VersioningType.URI,
  })

  const config = new DocumentBuilder()
    .setTitle('My App')
    .setDescription('')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(configService.get('port'), () => {
    logger.log(`Server running on port ${configService.get('port')}`)
  })
}
bootstrap()
