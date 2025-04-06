import { Module } from "@nestjs/common";
import { SecretsService } from "./secrets.service";
import { CacheModule } from "@nestjs/cache-manager";
import { configModule } from "src/config";

@Module({
  imports: [
    CacheModule.register(),
    configModule
  ],
  providers: [SecretsService],
  exports: [SecretsService],
})
export class SecretsModule { }
