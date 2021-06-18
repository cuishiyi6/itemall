import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subcategory", { schema: "itemall" })
export class Subcategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("varchar", { name: "link", nullable: true, length: 255 })
  link: string | null;

  @Column("varchar", { name: "maitKey", nullable: true, length: 255 })
  maitKey:string
}