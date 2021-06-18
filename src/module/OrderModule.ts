import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../entity/Order";
import { OrderDesc } from "../entity/OrderDesc";
import { JwtModule } from "@nestjs/jwt";
import { JWTConstant } from "../constant";
import { Goods } from "../entity/Goods";
import { OrderService } from "../service/OrderService";
import { OrderController } from "../controller/OrderController";

@Module({
  imports:[
    TypeOrmModule.forFeature([Order,OrderDesc,Goods]),
    // 注册jwt模块
    JwtModule.register({
      secret:JWTConstant.secret,
      signOptions:{expiresIn:JWTConstant.expiresIn}
    })
  ],
  controllers:[OrderController],
  providers:[OrderService]
})
export class OrderModule{}