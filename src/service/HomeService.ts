import { Injectable } from '@nestjs/common';
import { Banner } from '../entity/Banner';
import { Repository } from 'typeorm';
import { Goods } from '../entity/Goods';
import { Detail } from '../entity/Detail';
import { Recommend } from '../entity/Recommend';
import { InjectRepository } from '@nestjs/typeorm';
import { LIMIT } from '../constant';
@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(Recommend)
    private readonly recommendRepository: Repository<Recommend>,
    @InjectRepository(Goods)
    private readonly goodsRepository: Repository<Goods>,
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
  ) {}

  //查询首页数据
  // eslint-disable-next-line @typescript-eslint/ban-types
  async queryHome(): Promise<Object> {
    const banner = await this.bannerRepository.find();
    const recommend = await this.recommendRepository.find();
    return { banner, recommend };
  }

  //查询商品数据
  async queryGoods(type = 'pop', page = 1): Promise<Goods[]> {
    const skip = (page - 1) * LIMIT.PAGE_SIZE;
    return await this.goodsRepository.find({
      where: { type },
      skip,
      take: LIMIT.PAGE_SIZE,
    });
  }

  //根据iid查询商品的详情
  async queryDetail(iid: string): Promise<Detail> {
    return await this.detailRepository.findOne({ iid });
  }
}
