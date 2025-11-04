const { DataSource } = require('typeorm');
const path = require('path');

const {
  API_DB_HOST = 'postgres',
  API_DB_PORT = '5432',
  API_DB_USERNAME = 'postgres',
  API_DB_PASSWORD = 'password',
  API_DB_DATABASE = 'food-minimarket',
} = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: API_DB_HOST,
  port: parseInt(API_DB_PORT, 10),
  username: API_DB_USERNAME,
  password: API_DB_PASSWORD,
  database: API_DB_DATABASE,
  entities: [path.join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  synchronize: false,
  logging: false,
});

module.exports = AppDataSource;
