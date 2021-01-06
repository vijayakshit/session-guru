import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { Express } from 'express';

import { REDIS_URL, SESSION_SECRET, COOKIE_SECRET } from '../_config/constants';

const RedisStore = connectRedis(session);

declare module 'express-session' {
  export interface SessionData {
    sessionUser: { [key: string]: any };
  }
}

const attatchSessionManagementMiddleware = (app: Express): Express => {
  app.use(
    session({
      secret: SESSION_SECRET,
      store: new RedisStore({
        url: REDIS_URL,
        port: 6379,
        client: redis.createClient({ url: REDIS_URL }),
        ttl: 15 * 24 * 60 * 60 // 15 days
      }),
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(cookieParser(COOKIE_SECRET));
  return app;
};

export default attatchSessionManagementMiddleware;
