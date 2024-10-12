import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'blogchain_admin',
  password: process.env.POSTGRES_PASSWORD || 'password',
  db: process.env.POSTGRES_DB || 'blogchain_db',
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoloadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
}));
