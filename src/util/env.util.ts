import { z } from 'zod'

const envSchema = z.object({
  SECRETS_PATH: z.string(),
  VAULT_TOKEN: z.string(),
})

const env = envSchema.parse({
  SECRETS_PATH: process.env.SECRETS_PATH,
  VAULT_TOKEN: process.env.VAULT_TOKEN,
})

export default env
