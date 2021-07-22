import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cart } from '../entity/Cart';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goods } from '../entity/Goods';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Goods)
    private readonly goodsRepository: Repository<Goods>,
  ) {}

  /**
   * 查询购物车
   * @param userId
   */
  async query(uid): Promise<Promise<{ num: number; goods: Goods }>[]> {
    const goodList = [];
    // 查询当前用户的购物车记录中的商品gid
    const gid = await this.cartRepository.find({
      where: uid,
      select: ['gid', 'num', 'id'],
    });
    for (const item of gid) {
      const goods = await this.goodsRepository.findOne(item.gid);
      goodList.push({ id: item.id, goods, num: item.num });
    }
    return goodList;
  }

  /**
   * 添加
   * @param body
   */
  async save(body, uid): Promise<string> {
    // 查询授权用户添加的商品是否在购物车中存在 查到做修改操作  查不到做添加操作
    const id = await this.queryOne({ uid, gid: body.gid });
    if (id) {
      const { affected } = await this.cartRepository.update(id, {
        num: body.num,
      });
      return affected === 0 ? '添加失败' : '添加购物车成功';
    }
    await this.cartRepository.save(body);
    return body.id ? '添加购物车成功' : '添加购物车失败';
  }

  /**
   * 删除
   */
  async del(id): Promise<string> {
    // id = await this.queryOne({ uid, id });
    // if (!id) throw new UnauthorizedException('非法操作');
    const { affected } = await this.cartRepository.delete(id);
    return affected === 0 ? '删除失败' : '删除成功';
  }

  /**
   * 查询商品是否存在
   * @param where
   */
  async queryOne(where): Promise<Cart | undefined> {
    return await this.cartRepository.findOne({ where: where, select: ['id'] });
  }
}
