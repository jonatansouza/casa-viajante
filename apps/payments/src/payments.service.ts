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

  // test propose
  async createCharge({ amount, card: payment_method }: ChargeDto) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method,
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
    })
  }
}
