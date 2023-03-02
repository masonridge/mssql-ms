import { JwtRPCAuthGuard } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtRPCAuthGuard)
  async createOrder(@Body() request: CreateOrdersDto, @Req() req: Request) {
    console.log('ORDERS: ', req.user);
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }
  @Get('/:id')
  async getOrder(@Param('id') id: number) {
    return await this.ordersService.findOne({ where: { id } });
  }
}
