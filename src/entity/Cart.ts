import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {User} from './User';
import { Goods } from "./Goods";

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uid: number;

  @Column()
  gid: number;

  @Column()
  num: number;

}