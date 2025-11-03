import { registerAs } from '@nestjs/config';

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;
const intDbPort = parseInt(DB_PORT!);
const isNotProduction = NODE_ENV !== 'production';

export default registerAs('database', () => ({
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: intDbPort || 5432,
  username: DB_USERNAME || 'postgres',
  password: DB_PASSWORD || 'password',
  database: DB_DATABASE || 'food-minimarket',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: isNotProduction,
}));
