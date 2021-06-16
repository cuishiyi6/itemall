import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("detail", { schema: "itemall" })
export class Detail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "iid", nullable: true, length: 255 })
  iid: string | null;

  @Column("text", { name: "columns", nullable: true })
  columns: string | null;

  @Column("text", { name: "detailInfo", nullable: true })
  detailInfo: string | null;

  @Column("text", { name: "itemInfo", nullable: true })
  itemInfo: string | null;

  @Column("text", { name: "itemParams", nullable: true })
  itemParams: string | null;

  @Column("text", { name: "shopInfo", nullable: true })
  shopInfo: string | null;
}
