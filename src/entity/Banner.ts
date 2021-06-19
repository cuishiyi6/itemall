import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banner', { schema: 'itemall' })
export class Banner {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'height', nullable: true, length: 255 })
  height: string | null;

  @Column('varchar', { name: 'width', nullable: true, length: 255 })
  width: string | null;

  @Column('varchar', { name: 'link', nullable: true, length: 255 })
  link: string | null;

  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;
}
