import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookEntity } from "./book.entity";
import { GenresEntity } from "./genres.entity";

@Entity("connectionBookAndGenres")
export class ConnectionBookAndGenres {
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

  @ManyToOne(() => BookEntity, (book) => book.genres)
  book: BookEntity;

  @ManyToOne(() => GenresEntity, (genre) => genre.genres)
  genre: GenresEntity;
}
