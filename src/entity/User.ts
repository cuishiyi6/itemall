import {
  Column,
  CreateDateColumn, Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UpdateCommand } from '@nestjs/cli/commands/update.command';
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ comment: '手机号' })
  phone: string

  @ApiProperty()
  @Column({ comment: '密码' })
  password: string;

  @ApiProperty()
  @Column({ comment: '邮箱' })
  email: string;

  @ApiProperty()
  @Column({ comment: '性别' })
  gander: number;

  @ApiProperty()
  @Column({ comment: '昵称' })
  nickName: string;

  
  @CreateDateColumn({ comment: '注册时间' })
  createDatetime: Date;
  @UpdateDateColumn({ comment: '修改时间' })
  updateDatetime: Date;
  @Column({ comment: '头像' })
  avatar: string;
}
