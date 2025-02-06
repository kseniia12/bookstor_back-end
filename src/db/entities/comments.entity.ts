import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

@Entity("comments")
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  data: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.comments)
  book: BookEntity;
}
