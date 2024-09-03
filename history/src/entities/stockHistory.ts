import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product';
import { Stock } from './stock';

@Entity('stock_history')
export class StockHistory {
  @PrimaryGeneratedColumn()
  id!: number;
 
  @ManyToOne(() => Stock, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stock_id' })
  stock!: Stock;

  @Column({ type: 'varchar', length: 255 })
  action!: string;  // e.g., 'create', 'update', 'delete', 'increase_stock', 'decrease_stock'

  @Column({ type: 'integer', nullable: true })
  quantity!: number;  // Quantity affected by the action

  @Column({ type: 'integer', nullable: false, default: 0 })
  quantity_on_shelf!: number;  
  
  @Column({ type: 'integer', nullable: false, default: 0 })
  quantity_in_order!: number;  
    
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;  // Automatically set timestamp for when the action occurred

  @Column({ type: 'varchar', length: 255, nullable: true })
  details!: string;  // Additional details or comments about the action
}
