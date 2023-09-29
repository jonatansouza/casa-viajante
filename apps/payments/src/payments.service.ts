import { ChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET'), {
    apiVersion: '2023-08-16'
  })

  async createCharge({ card, amount }: ChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'brl'
    })
  }
}
