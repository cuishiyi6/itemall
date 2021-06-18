import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Goods } from "../entity/Goods";
import { Order } from "../entity/Order";
import { OrderDesc } from "../entity/OrderDesc";


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Goods) private readonly goodsRepository: Repository<Goods>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDesc) private readonly orderDescRepository: Repository<OrderDesc>
  ) {
  }


  /**
   * 添加订单
   */
  async save(body, userId): Promise<string> {
    if (userId !== body.uid) throw new UnauthorizedException("非法操作")
    let totalPrice = 0;
    const { uid, goods, address } = body;

    //生成一个订单id

    const order = new Order();
    order.id = Date.now().toString() + Math.floor(Math.random() * 100000000);
    order.uid = uid;
    order.address = address;
    //添加订单表
    await this.orderRepository.save(order)
    //查出商品
    for (const item of goods) {
      const orderDesc = new OrderDesc();
      const goods = await this.goodsRepository.findOne(item.gid);
      orderDesc.title = goods.title
      orderDesc.price = Number(goods.price)
      let {img} = JSON.parse(goods.show)
      orderDesc.img = img;
      orderDesc.num = item.num;
      orderDesc.oid = order.id;
      await this.orderDescRepository.save(orderDesc)
      totalPrice += (orderDesc.price * orderDesc.num);
    }
    //更新订单表中的价格
    await this.orderRepository.save({ id: order.id, totalPrice });
    return "订单添加成功"
  }
}
