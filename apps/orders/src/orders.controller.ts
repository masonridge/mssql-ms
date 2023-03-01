import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrdersDto) {
    return this.ordersService.save(request);
  }
  @Get('/:id')
  async getOrder(@Param('id') id: number) {
    return await this.ordersService.findOne({ where: { id } });
  }
}
