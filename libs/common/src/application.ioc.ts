import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Logger } from "nestjs-pino";

export const configureServices = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
};