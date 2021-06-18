import { Module } from '@nestjs/common';

import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";
import { UserModule } from "./module/UserModule";
import { HomeModule } from "./module/HomeModule";
import { CategoryModule } from "./module/CategoryModule";
import { CartModule } from "./module/CartModule";
import { OrderModule } from "./module/OrderModule";

@Module({
  //注入数据库模块

  imports:
    [UserModule,HomeModule,CategoryModule,CartModule,OrderModule,
      TypeOrmModule.forRootAsync({
    useFactory:async ()=>Object.assign(await getConnectionOptions(),{autoLoadEntities: true})
  })]
})
export class AppModule {}
