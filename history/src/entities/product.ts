import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  plu!: string;
  
  @Column({ type: 'varchar', length: 255, nullable: false})
  product_name!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;  
}
