import 'reflect-metadata';
import { DataSource } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { env } from './env.js';
import { User } from '../entities/User.js';

function buildSslOptions() {
  if (!env.db.ssl) return false as const;

  const ssl: { rejectUnauthorized: boolean; ca?: string } = {
    rejectUnauthorized: env.db.sslRejectUnauthorized
  };

  if (env.db.caPath) {
    const caAbs = path.resolve(env.db.caPath);
    ssl.ca = fs.readFileSync(caAbs, 'utf8');
  }

  return ssl;
}

export const AppDataSource = new DataSource(
  env.db.url
    ? {
        type: 'postgres',
        url: env.db.url,
        ssl: buildSslOptions(),
        synchronize: false,
        logging: false,
        entities: [User],
        migrations: ['src/migrations/*.ts']
      }
    : {
        type: 'postgres',
        host: env.db.host,
        port: env.db.port,
        database: env.db.name,
        username: env.db.user,
        password: env.db.password,
        ssl: buildSslOptions(),
        synchronize: false,
        logging: false,
        entities: [User],
        migrations: ['src/migrations/*.ts']
      }
);
