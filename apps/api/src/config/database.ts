import { registerAs } from '@nestjs/config';
import DataSource from './data-source';

export default registerAs('database', () => (DataSource.options));
