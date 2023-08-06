import { DataSource } from 'typeorm';

interface DataSourceConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const getDataSource = (config: DataSourceConfig) => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
    migrations: [
        __dirname + '/migrations/*{.ts,.js}',
    ],
    // synchronize: true,
  });

  return dataSource;
}
