import { Module } from '@nestjs/common';
import { HomeController } from './api/home.controller';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [HomeController],
  providers: [],
})
export class AppModule { }
