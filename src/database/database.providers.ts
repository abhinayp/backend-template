import { ConfigService } from '@nestjs/config';
import { getDataSource } from './database.source';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = getDataSource(configService.get('database'))
      return dataSource.initialize();
    },
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
