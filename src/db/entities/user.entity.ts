import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RatingEntity } from "./rating.entity";

import { FavoritesEntity } from "./favorites.entity";
import { CommentsEntity } from "./comments.entity";
import { CartItemEntity } from "./cart_item.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    type: "varchar",
  })
  email: string;

  @Column({ nullable: true, type: "varchar" })
  fullName: string;

  @Column({
    type: "varchar",
  })
  password: string;

  @Column({
    nullable: true,
    type: "varchar",
  })
  photo: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @OneToMany(() => CartItemEntity, (cart) => cart.user)
  cartItems: CartItemEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.user)
  favorites: FavoritesEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];
}
