import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

@Entity("cart_item")
export class CartItemEntity {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.cartItems)
  book: BookEntity;
}
