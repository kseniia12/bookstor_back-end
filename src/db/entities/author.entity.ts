import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("author")
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
