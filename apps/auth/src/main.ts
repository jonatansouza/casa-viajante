import { configureServices } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  configureServices(app);
  const port = app.get(ConfigService).get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
