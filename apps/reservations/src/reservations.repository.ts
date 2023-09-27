import { BaseRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReservationDocument } from "./entities/reservation.schema";

@Injectable()
export class ReservationsRepository extends BaseRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(@InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>) {
    super(reservationModel)
  }

}