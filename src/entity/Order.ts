import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Order {

  @PrimaryColumn()
  id:string

  @CreateDateColumn()
  createDateTime:Date

  @Column({nullable:true})
  endDateTime:Date

  @Column({
    default:0,
    comment:'0待付款 1 已完成 2取消'
  })
  status:number

  @Column({
    type:"double",
    nullable:true
  })
  totalPrice:number

  @Column()
  uid:number

  @Column()
  address:string
}