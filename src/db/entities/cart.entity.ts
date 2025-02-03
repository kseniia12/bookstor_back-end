import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

@Entity("cart_item")
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.cartItems)
  book: BookEntity;
}
