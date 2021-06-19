import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guard/AuthGuard';
import { OrderService } from '../service/OrderService';
import { query } from 'express';
import { Order } from '../entity/Order';

@ApiTags('订单')
@UseGuards(AuthGuard)
@Controller('oder')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @ApiOperation({
    summary: '添加订单',
  })
  @Post()
  async save(@Body() body, @Req() req): Promise<string> {
    return this.service.save(body, req.auth_user);
  }

  @ApiOperation({
    summary: '查询订单',
  })
  @Get()
  async query(@Body() body, @Req() req): Promise<Order[]> {
    return this.service.query(body, req.auth_user);
  }

  @ApiOperation({
    summary: '取消订单',
  })
  @Post('cancel')
  async modify(@Body() body, @Req() req): Promise<string> {
    return this.service.modify(body, req.auth_user);
  }

  @ApiOperation({
    summary: '支付订单',
  })
  @Post('pay')
  async pay(@Body() body, @Req() req): Promise<string> {
    return this.service.pay(body, req.auth_user);
  }

  @ApiOperation({
    summary: '删除订单',
  })
  @Post('del')
  async del(@Body() body, @Req() req): Promise<string> {
    return this.service.del(body, req.auth_user);
  }
}
