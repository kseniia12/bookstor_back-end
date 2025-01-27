import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConnectionBookAndGenres } from "./connectionBookAndGenres.entity";

@Entity("genres")
export class GenresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ConnectionBookAndGenres, (genre) => genre.genre)
  genres: ConnectionBookAndGenres[];
}
