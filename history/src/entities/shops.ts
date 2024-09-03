import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  shop_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  shop_address!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
  
}
