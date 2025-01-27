import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";
import { GenresEntity } from "./genres.entity";

@Entity("connectionBookAndGenres")
export class ConnectionBookAndGenres {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.genres)
  book: BookEntity;

  @ManyToOne(() => GenresEntity, (genre) => genre.genres)
  genre: GenresEntity;
}
