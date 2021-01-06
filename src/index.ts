import express from 'express';
import 'reflect-metadata';
import { synchronizeDBSchema } from './_utils/dbUtils';
import attatchAllMiddleWares from './_middleware';
import { loadConfigs } from './_utils/envUtils';
loadConfigs();

const app = express();
const PORT = process.env.PORT || 5000;

attatchAllMiddleWares(app);

//TODO: Move this to a route or based on an env variable
synchronizeDBSchema();

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
