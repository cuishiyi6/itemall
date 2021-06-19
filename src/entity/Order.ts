import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { OrderDesc } from './OrderDesc';
import { ORDER_STATUS } from '../constant';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createDateTime: Date;

  @Column({ nullable: true })
  endDateTime: Date;

  @Column({
    default: ORDER_STATUS.INIT,
    comment: '0待付款 1 已完成 2取消',
  })
  status: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  totalPrice: number;

  @Column()
  uid: number;

  @Column()
  address: string;

  @DeleteDateColumn()
  delDatetime: Date;

  orderDesc: OrderDesc[];
}
