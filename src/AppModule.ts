import { Module } from '@nestjs/common';

import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";
import { UserModule } from "./module/UserModule";

@Module({
  //注入数据库模块

  imports:
    [UserModule,
      TypeOrmModule.forRootAsync({
    useFactory:async ()=>Object.assign(await getConnectionOptions(),{autoLoadEntities: true})
  })]
})
export class AppModule {}
