import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goods } from '../entity/Goods';
import { OrderDesc } from '../entity/OrderDesc';
import { Order } from '../entity/Order';
import { ORDER_STATUS } from '../constant';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Goods)
    private readonly goodsRepository: Repository<Goods>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDesc)
    private readonly orderDescRepository: Repository<OrderDesc>,
  ) {}

  /**
   * 添加订单
   * @param body
   * @param userId
   */
  async save(body, userId): Promise<string> {
    let totalPrice = 0;
    const { uid, goods, address } = body;
    // 生成一个订单id
    const order = new Order();
    order.id = Date.now().toString() + Math.floor(Math.random() * 100000000);
    order.uid = uid;
    order.address = address;
    // 添加订单表
    await this.orderRepository.save(order);
    // 查出商品
    for (const item of goods) {
      const orderDesc = new OrderDesc();
      const goods = await this.goodsRepository.findOne(item.gid);
      orderDesc.title = goods.title;
      orderDesc.price = Number(goods.price);
      orderDesc.show = goods.show;
      orderDesc.num = item.num;
      orderDesc.oid = order.id;
      await this.orderDescRepository.save(orderDesc);
      totalPrice += orderDesc.price * orderDesc.num;
    }
    // 更新订单表中的价格
    await this.orderRepository.save({ id: order.id, totalPrice });
    return '订单添加成功';
  }

  /**
   * 查询订单
   * @param body
   * @param uid
   */
  async query(body, uid): Promise<Order[]> {
    // 创建QueryBuilder
    const db = this.orderRepository
      .createQueryBuilder('order')
      .orderBy('order.id', 'DESC');
    // 判断body中是否有开始时间和结束时间
    if (body.startTime && body.endTime) {
      const { startTime, endTime } = body;
      delete body.startTime;
      delete body.endTime;
      db.where(body);
      db.andWhere('createDatetime BETWEEN :startTime AND :endTime', {
        startTime,
        endTime,
      });
    } else {
      db.where(body);
    }
    // 执行查询
    const orders = await db.execute();
    for (const order of orders) {
      order.orderDesc = await this.orderDescRepository.find({
        oid: order.order_id,
      });
    }
    return orders;
  }

  /**
   * 取消订单
   * @param body
   * @param req
   */
  async modify(body): Promise<string> {
    const { id } = body;
    const { affected } = await this.orderRepository.update(id, {
      status: ORDER_STATUS.CANCEL,
    });
    return affected ? '订单已取消' : '订单取消失败';
  }

  /**
   * 支付订单
   * @param body
   * @param uid
   */
  async pay(body, uid): Promise<string> {
    //id 修改状态 为1
    const { id } = body;
    /**
     * TODO支付代码
     */

    const { affected } = await this.orderRepository.update(id, {
      status: ORDER_STATUS.FINISH,
    });
    return affected ? '支付成功' : '支付失败';
  }

  /**
   * 删除订单
   * @param body
   * @param uid
   */
  async del(body): Promise<string> {
    const { id } = await this.orderRepository.softRemove({ id: body.id });
    return id ? '删除成功' : '删除失败';
  }

  /**
   * 根据订单id查询
   * @param id
   */
  async queryById(id: number) {
    const order = await this.orderRepository.findOne(id);
    order.orderDesc = await this.orderDescRepository.find({
      oid: order.id,
    });
    return order;
  }
}
