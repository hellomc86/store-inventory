import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { Product } from './product';
  import { Shop } from './shops';
  
  @Entity('stock')
  export class Stock {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => Product, { onDelete: 'CASCADE',  nullable: false })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
  
    @ManyToOne(() => Shop, { onDelete: 'CASCADE',  nullable: false })
    @JoinColumn({ name: 'shop_id' })
    shop!: Shop;
  
    @Column({ type: 'integer', nullable: false, default: 0 })
    quantity_on_shelf!: number;  
    
    @Column({ type: 'integer', nullable: false, default: 0 })
    quantity_in_order!: number;  
      
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;  // Automatically set timestamp for when the action occurred  
  }
  