import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../common/guard/AuthGuard";
import { OrderService } from "../service/OrderService";

@ApiTags('订单')
@UseGuards(AuthGuard)
@Controller('oder')
export class OrderController {
  constructor(private readonly service:OrderService) {
  }

  @ApiOperation({
    summary:'添加订单'
  })
  @Post()
  async save(@Body() body,@Req()req):Promise<string>{
    return this.service.save(body,req.auth_user)
  }
}