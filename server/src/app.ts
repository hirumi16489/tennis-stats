import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env', debug: true });
import express, { Express } from 'express';
import PlayerHandler from './player/handler/player.handler';

const app: Express = express();

app.use(PlayerHandler);

export default app;
