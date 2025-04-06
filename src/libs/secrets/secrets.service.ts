import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import * as Vault from "node-vault";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class SecretsService {
  private _vc: Vault.client;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly config: ConfigService
  ) { }

  init() {
    this._vc = Vault({
      apiVersion: "v1",
      endpoint: this.config.get("vaultUrl"),
      token: this.config.get("vaultToken"),
    });
  }

  get vc() {
    if (!this._vc) {
      this.init();
    }
    return this._vc;
  }

  async setSecrets() {
    const secrets = await this.vc.read(this.config.get("secretsPath"))
    await this.cacheManager.set("secrets", secrets?.data?.data);
    return secrets?.data?.data;
  }

  async getSecret(key: string) {
    const secrets = await this.getSecrets()
    return secrets[key];
  }

  async getSecrets() {
    const secrets = await this.cacheManager.get("secrets");
    if (!secrets) {
      await this.setSecrets();
    }
    return secrets;
  }

  async onModuleInit() {
    await this.setSecrets();
  }
}
