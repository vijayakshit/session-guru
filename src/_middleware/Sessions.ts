import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { Express } from 'express';

// const client = redis.createClient({ url: process.env.REDIS_URL });
const RedisStore = connectRedis(session);

declare module 'express-session' {
  export interface SessionData {
    sessionUser: { [key: string]: any };
  }
}

const attatchSessionManagementMiddleware = (app: Express): Express => {
  app.use(
    session({
      secret: 'sedsdsfcret',
      store: new RedisStore({
        url: process.env.REDIS_URL,
        port: 6379,
        client: redis.createClient({ url: process.env.REDIS_URL }),
        //Change ttl
        ttl: 15 * 24 * 60 * 60 // 15 days
      }),
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(cookieParser('secretSign#143_!223'));
  return app;
};

export default attatchSessionManagementMiddleware;
