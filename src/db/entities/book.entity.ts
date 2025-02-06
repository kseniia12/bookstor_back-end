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
import { FavoritesEntity } from "./favorites.entity";
import { CommentsEntity } from "./comments.entity";

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

  @OneToMany(() => FavoritesEntity, (cartItem) => cartItem.book)
  favorites: FavoritesEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.book)
  comments: CommentsEntity[];
}
