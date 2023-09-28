import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ReservationDocument, ReservationSchema } from './entities/reservation.schema';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      })
    }),
    DatabaseModule.forFeature(
      [
        {
          name: ReservationDocument.name,
          schema: ReservationSchema
        }
      ]
    )
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
