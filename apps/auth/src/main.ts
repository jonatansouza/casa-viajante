import { configureServices } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const port = app.get(ConfigService).get('TCP_PORT');
  const httpPort = app.get(ConfigService).get('HTTP_PORT');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port
    }
  })
  configureServices(app);
  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();
