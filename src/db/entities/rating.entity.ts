import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "./user.entity";
import { BookEntity } from "./book.entity";

@Entity("rating")
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

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

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.ratings)
  book: BookEntity;
}
