import { AbstractService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { Orders } from './orders';

@Injectable()
export class OrdersService extends AbstractService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {
    super(ordersRepository, billingClient, 'order_created');
  }

  async createOrder(dto: CreateOrdersDto, Authentication: string) {
    await lastValueFrom(
      this.billingClient.emit('order_created', { ...dto, Authentication }),
    );
    return this.ordersRepository.save(dto);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
