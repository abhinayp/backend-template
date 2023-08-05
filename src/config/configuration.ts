import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs'
import { join } from 'path';

const configuration = () => {
  const config = JSON.parse(readFileSync(join(__dirname, 'configuration.json'), 'utf8'))
  return config;
}

export default ConfigModule.forRoot({
  load: [configuration],
  isGlobal: true
})
