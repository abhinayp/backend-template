import { Controller, Get } from "@nestjs/common";
import { SecretsService } from "../libs/secrets/secrets.service";
@Controller()
export class HomeController {
  constructor(private readonly secretsService: SecretsService) { }
  @Get("/healthcheck")
  async healthcheck() {
    return "OK";
  }

  @Get("/vault")
  async vault() {

    return this.secretsService.getSecrets()
  }
}
