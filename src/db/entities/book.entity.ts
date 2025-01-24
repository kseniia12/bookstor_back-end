import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
