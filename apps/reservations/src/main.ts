import { configureServices } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  configureServices(app);
  await app.listen(3000);
}
bootstrap();
