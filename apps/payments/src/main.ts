import { configureServices } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const httpPort = app.get(ConfigService).get<number>('HTTP_PORT')
  const tcpPort = app.get(ConfigService).get<number>('TCP_PORT')

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: tcpPort,
    }
  })

  configureServices(app)
  await app.startAllMicroservices();
}
bootstrap();
