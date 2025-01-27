import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConnectionBookAndGenres } from "./connectionBookAndGenres.entity";

@Entity("book")
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "float" })
  priceSoft: number;

  @Column({ type: "float" })
  priceHard: number;

  @Column()
  description: string;

  @Column()
  cover: string;

  @Column()
  countHard: number;

  @Column()
  countSoft: number;

  @Column({ default: false })
  bestseller: boolean;

  @OneToMany(() => ConnectionBookAndGenres, (genre) => genre.book)
  genres: ConnectionBookAndGenres[];
}
