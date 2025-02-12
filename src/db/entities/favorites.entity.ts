import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

@Entity("favorites")
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.favorites)
  book: BookEntity;
}
