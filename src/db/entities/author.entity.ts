import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";

@Entity("author")
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
