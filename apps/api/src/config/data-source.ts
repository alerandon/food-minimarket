import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Store } from '../modules/stores/entities/store.entity';
import { Product } from '../modules/products/entities/product.entity';
import { createUsersTable1762298400367 } from 'src/migrations/1762298400367-create-users-table';
import { createProductsTable1762298472187 } from 'src/migrations/1762298472187-create-products-table';
import { createStoresTable1762298469927 } from 'src/migrations/1762298469927-create-stores-table';

const {
  API_DB_HOST = 'postgres',
  API_DB_PORT = '5432',
  API_DB_USERNAME = 'postgres',
  API_DB_PASSWORD = 'password',
  API_DB_DATABASE = 'food-minimarket',
} = process.env;

export default new DataSource({
  type: 'postgres',
  host: API_DB_HOST,
  port: parseInt(API_DB_PORT, 10),
  username: API_DB_USERNAME,
  password: API_DB_PASSWORD,
  database: API_DB_DATABASE,
  entities: [User, Store, Product],
  migrations: [
    createUsersTable1762298400367,
    createStoresTable1762298469927,
    createProductsTable1762298472187
  ],
  synchronize: false,
  logging: false,
});
