import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import { Logger } from "nestjs-pino";

export const configureServices = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
  app.use(cookieParser());
};