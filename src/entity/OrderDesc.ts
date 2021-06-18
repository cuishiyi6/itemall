import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderDesc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  oid: string;

  @Column()
  title: string;

  @Column({ type: "double", name: "price", nullable: true})
  price: number | null;

  @Column({ length: 1000 })
  img: string;

  @Column()
  num: number;

}