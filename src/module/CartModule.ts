import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTConstant } from "../constant";
import { Goods } from "../entity/Goods";
import { JwtModule } from "@nestjs/jwt";
import { Cart } from "../entity/Cart";
import { CartController } from "../controller/CartController";
import { CartService } from "../service/CartService";

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart,Goods]),
    JwtModule.register({
      secret:JWTConstant.secret,
      signOptions:{expiresIn:JWTConstant.expiresIn}
    })
  ],
  controllers:[CartController],
  providers:[CartService]
})
export class CartModule{}