import express from 'express';
import { Express } from 'express';

const attatchBodyParserMiddleware = (app: Express): Express => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app;
};

export default attatchBodyParserMiddleware;
