import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category', { schema: 'itemall' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'maitKey', nullable: true, length: 255 })
  maitKey: string | null;

  @Column('varchar', { name: 'miniWallkey', nullable: true, length: 255 })
  miniWallkey: string | null;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;
}
