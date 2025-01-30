import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RatingEntity } from "./rating.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  fullName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];
}
