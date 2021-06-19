import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goods } from '../entity/Goods';
import { query } from 'express';
import { Cart } from '../entity/Cart';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Goods)
    private readonly goodsRepository: Repository<Goods>,
  ) {}

  /**
   * 查询购物车
   * @param uid
   */
  async query(uid): Promise<Promise<{ num: number; goods: Goods }>[]> {
    const goodList = [];
    //查询当前用户的购物车记录中的商品gid
    const gid = await this.cartRepository.find({
      where: uid,
      select: ['gid', 'num'],
    });
    for (const item of gid) {
      const goods = await this.goodsRepository.findOne(item.gid);
      goodList.push({ goods, num: item.num });
    }
    return goodList;
  }

  /**
   * 添加
   */
  async save(body, uid): Promise<string> {
    if (body.uid !== uid) throw new UnauthorizedException('非法操作');
    const id = await this.queryOne({ uid, gid: body.gid });
    if (id) {
      const { affected } = await this.cartRepository.update(id, {
        num: body.num,
      });
      return affected === 0 ? '修改失败' : '修改成功';
    }
    await this.cartRepository.save(body);

    return body.id ? '新增成功' : '新增失败';
  }

  /**
   * 删除
   */
  async del(id, uid): Promise<string> {
    id = await this.queryOne({ uid, id });
    if (!id) throw new UnauthorizedException('非法操作');
    const { affected } = await this.cartRepository.delete(id);
    return affected === 0 ? '删除失败' : '删除成功';
  }

  /**
   * 查询商品是否存在
   */
  async queryOne(where): Promise<Cart | undefined> {
    return await this.cartRepository.findOne({ where: where, select: ['id'] });
  }
}
