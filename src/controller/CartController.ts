import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../common/guard/AuthGuard";
import { Goods } from "../entity/Goods";
import { CartService } from "../service/CartService";





@ApiTags('购物车')
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController{
  constructor(private readonly service:CartService) {
  }

  @ApiOperation({
    summary:'查询购物车'
  })
  @Get()
  async query(@Query() userId):Promise<Promise<{num:number;goods:Goods}>[]>{
    return this.service.query(userId)
  }

  @ApiOperation({
    summary:'添加购物车'
  })
  @Post()
  async save(@Body() body, @Req() req):Promise<string>{
    return this.service.save(body,req.auth_user)
  }
  @ApiOperation({
    summary:'删除购物车'
  })

  @Delete()
  async  del(@Body('id')id,@Req() req):Promise<string>{
    return this.service.del(id,req.auth_user)
  }
}