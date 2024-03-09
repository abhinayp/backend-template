import env from '@env'
import { Logger } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { readFileSync } from 'fs'
import { join } from 'path'

const getConfiguration = (filename: string = env.CONFIGURATION_FILE) => {
  const logger = new Logger('main')
  const configPath = join(env.PWD, filename)
  logger.log(`Loading configuration from ${configPath}`)

  try {
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    return config
  } catch (error) {
    console.error(error)
    throw new Error(`Error reading configuration file: ${filename}`)
  }
}

export default ConfigModule.forRoot({
  load: [getConfiguration],
  isGlobal: true,
  cache: true,
})

export { getConfiguration }
