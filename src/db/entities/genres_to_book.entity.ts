import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookEntity } from "./book.entity";
import { GenresEntity } from "./genres.entity";

@Entity("genres_to_book")
export class GenresToBookEntity {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;

  @ManyToOne(() => BookEntity, (book) => book.genres)
  book: BookEntity;

  @ManyToOne(() => GenresEntity, (genre) => genre.genres)
  genre: GenresEntity;
}
