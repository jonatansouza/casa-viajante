import { configureServices } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  configureServices(app);
  const port = app.get(ConfigService).get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
