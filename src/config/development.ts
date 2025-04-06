import env from "src/util/env.util";

export default {
  secretsPath: env['SECRETS_PATH'] || "/secret/data/production/backend",
  vaultToken: env['VAULT_TOKEN'] || "root",
  vaultUrl: "http://PROJECTNAME-vault:8200"
}
