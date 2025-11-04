import { registerAs } from '@nestjs/config';
import AppDataSource = require('./data-source.cjs');

export default registerAs('database', () => ({
  ...AppDataSource.options,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
}));
