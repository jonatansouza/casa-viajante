import { PAYMENT_SERVICE } from '@app/common/constants/services';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  /**
   *
   */
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentClient: ClientProxy
    ) {
  }

  async create(createReservationDto: CreateReservationDto, userId: string) {
    const timestamp = new Date();
    return this.paymentClient.send('create_charge', createReservationDto.charge)
                             .pipe(
                                map(({id: invoiceId}) => {
                                  return this.reservationsRepository.create({
                                    ...createReservationDto,
                                    invoiceId, 
                                    timestamp,
                                    userId
                                  })
                                })
                             )
  }

  async findAll() {
    return this.reservationsRepository.find({})
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({_id})
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate({_id}, {
      $set: updateReservationDto
    })
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({_id})
  }
}
