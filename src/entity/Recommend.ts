import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recommend', { schema: 'itemall' })
export class Recommend {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('varchar', { name: 'link', nullable: true, length: 255 })
  link: string | null;
}
