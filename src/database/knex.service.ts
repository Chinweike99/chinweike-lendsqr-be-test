import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class KnexService implements OnModuleInit, OnModuleDestroy {
  public knex;

  async onModuleInit() {
    this.knex = knex({
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      pool: { min: 2, max: 10 },
    });
    console.log('Database connected successfully');
  }

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}