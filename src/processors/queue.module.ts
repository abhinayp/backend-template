import { BullModule } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";

export const QueueModule = BullModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get('redis.host'),
      port: configService.get('redis.port')
    },
  }),
  inject: [ConfigService],
})
