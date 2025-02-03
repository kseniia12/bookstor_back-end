import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ConnectionBookAndGenres } from "./connectionBookAndGenres.entity";
import { AuthorEntity } from "./author.entity";
import { RatingEntity } from "./rating.entity";
import { CartItemEntity } from "./cart.entity";

@Entity("book")
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "float" })
  priceSoft: number;

  @Column({ type: "float" })
  priceHard: number;

  @Column()
  description: string;

  @Column()
  cover: string;

  @Column()
  countHard: number;

  @Column()
  countSoft: number;

  @Column({ default: false })
  bestseller: boolean;

  @OneToMany(() => ConnectionBookAndGenres, (genre) => genre.book)
  genres: ConnectionBookAndGenres[];

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.book)
  ratings: RatingEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.book)
  cartItems: CartItemEntity[];

  // @ManyToOne(() => CartItemEntity, (cart) => cart.books)
  // cart: CartItemEntity;
}
