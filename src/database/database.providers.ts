import { ConfigService } from '@nestjs/config'
import { getDataSource } from './database.source'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = getDataSource(configService.get('database'))
      return dataSource.initialize()
    },
  },
]
