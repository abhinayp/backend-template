import { Module } from '@nestjs/common';
import { HomeController } from './api/home.controller';
import { SecretsModule } from './libs/secrets/secrets.module';
import { configModule } from './config';

@Module({
  imports: [
    configModule,
    SecretsModule
  ],
  controllers: [HomeController],
  providers: [],
})
export class AppModule { }
