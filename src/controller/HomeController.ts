import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { Goods } from '../entity/Goods';
import { Detail } from '../entity/Detail';
import { HomeService } from '../service/HomeService';

@ApiTags('首页')
@Controller('home')
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @ApiOperation({
    summary: '请求首页的数据',
  })
  @Get()
  // eslint-disable-next-line @typescript-eslint/ban-types
  async queryHome(): Promise<Object> {
    return this.service.queryHome();
  }
  @ApiOperation({
    summary: '请求商品的数据',
  })
  @Get('goods')
  async queryGoods(@Query() query): Promise<Goods[]> {
    return this.service.queryGoods(query.type, query.page);
  }
  @ApiOperation({
    summary: '请求商品的详情',
  })
  @Get('detail')
  async queryDetail(@Query('iid') iid: string): Promise<Detail> {
    return this.service.queryDetail(iid);
  }
  @ApiOperation({
    summary: '根据id查询商品',
  })
  @Get('/good')
  async queryGoodsById(@Query('id') id: number[]): Promise<Goods[]> {
    return this.service.queryGoodsById(id);
  }
}
