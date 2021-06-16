import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("goods", { schema: "itemall" })
export class Goods {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "cfav", nullable: true, length: 255 })
  cfav: string | null;

  @Column("varchar", { name: "clientUrl", nullable: true, length: 1000 })
  clientUrl: string | null;

  @Column("varchar", { name: "cparam", nullable: true, length: 255 })
  cparam: string | null;

  @Column("varchar", { name: "iid", nullable: true, length: 255 })
  iid: string | null;

  @Column("varchar", { name: "itemMarks", nullable: true, length: 255 })
  itemMarks: string | null;

  @Column("varchar", { name: "itemType", nullable: true, length: 255 })
  itemType: string | null;

  @Column("varchar", {
    name: "leftbottom_taglist",
    nullable: true,
    length: 255,
  })
  leftbottomTaglist: string | null;

  @Column("varchar", { name: "lefttop_taglist", nullable: true, length: 255 })
  lefttopTaglist: string | null;

  @Column("varchar", { name: "link", nullable: true, length: 1000 })
  link: string | null;

  @Column("varchar", { name: "orgPrice", nullable: true, length: 255 })
  orgPrice: string | null;

  @Column("varchar", { name: "popularStar", nullable: true, length: 255 })
  popularStar: string | null;

  @Column("varchar", { name: "price", nullable: true, length: 255 })
  price: string | null;

  @Column("varchar", { name: "props", nullable: true, length: 255 })
  props: string | null;

  @Column("varchar", { name: "ptpC", nullable: true, length: 255 })
  ptpC: string | null;

  @Column("varchar", { name: "sale", nullable: true, length: 255 })
  sale: string | null;

  @Column("varchar", { name: "shopId", nullable: true, length: 255 })
  shopId: string | null;

  @Column("varchar", { name: "show", nullable: true, length: 255 })
  show: string | null;

  @Column("varchar", { name: "showLarge", nullable: true, length: 255 })
  showLarge: string | null;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "titleTags", nullable: true, length: 255 })
  titleTags: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;
}
