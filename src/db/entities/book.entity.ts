import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { AuthorEntity } from "./author.entity";
import { RatingEntity } from "./rating.entity";
import { CartItemEntity } from "./cart_item.entity";
import { FavoritesEntity } from "./favorites.entity";
import { CommentsEntity } from "./comments.entity";
import { GenresToBookEntity } from "./genres_to_book.entity";

@Entity("book")
export class BookEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "float" })
  priceSoft: number;

  @Column({ type: "float" })
  priceHard: number;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  cover: string;

  @Column({ type: "int4" })
  countHard: number;

  @Column({ type: "int4" })
  countSoft: number;

  @Column({ default: false, type: "bool" })
  bestseller: boolean;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;

  @OneToMany(() => GenresToBookEntity, (genre) => genre.book)
  genres: GenresToBookEntity[];

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
