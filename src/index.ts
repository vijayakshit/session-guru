import express from 'express';
import 'reflect-metadata';
import { sync } from './_utils/dbUtils';
import attatchAllMiddleWares from './_middleware';
import { loadConfigs } from './_utils/envUtils';
loadConfigs();

const app = express();
const PORT = process.env.PORT || 5000;

attatchAllMiddleWares(app);

//Run sync with a custom env variable
sync();

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
