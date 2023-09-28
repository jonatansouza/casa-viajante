import { configureServices } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  configureServices(app);
  await app.listen(3000);
}
bootstrap();
