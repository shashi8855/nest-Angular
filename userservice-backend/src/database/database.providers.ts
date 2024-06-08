/* eslint-disable prettier/prettier */
import { createConnection } from 'typeorm';
import * as mysql from 'mysql2/promise';
import { DatabaseQueries } from './database.queries';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
      });

      await connection.query(DatabaseQueries.createDatabase, []);
      await connection.end();

      return createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest_js_project',
        entities: [],
      }).then(async (connection) => {
        await connection.query(DatabaseQueries.createTable, []);
        return connection;
      });
    },
  },
];
