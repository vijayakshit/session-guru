import path from 'path';
import { Connection, createConnection } from 'typeorm';

let connection: Connection;

const entitiesPath = path.join(process.cwd(), 'dist/_entities/*.js');

export const sync = async () => {
  await getConnection();
  connection.synchronize();
};

export const getConnection = async (): Promise<Connection> => {
  const db_url = process.env.DATABASE_URL;
  if (!connection) {
    connection = await createConnection({
      type: 'postgres',
      url: db_url,
      entities: [entitiesPath],
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return connection;
};
