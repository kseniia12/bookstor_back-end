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

@Entity("comments")
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

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

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.comments)
  book: BookEntity;
}
