import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from '../entity/Banner';
import { Recommend } from '../entity/Recommend';
import { Detail } from '../entity/Detail';
import { Goods } from '../entity/Goods';
import { Module } from '@nestjs/common';
import { HomeService } from '../service/HomeService';
import { HomeController } from '../controller/HomeController';
@Module({
  imports: [TypeOrmModule.forFeature([Banner, Recommend, Goods, Detail])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
