import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "./user.entity";
import { BookEntity } from "./book.entity";

@Entity("rating")
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.ratings)
  book: BookEntity;
}
