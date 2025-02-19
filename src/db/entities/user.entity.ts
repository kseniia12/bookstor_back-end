import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RatingEntity } from "./rating.entity";
import { CartItemEntity } from "./cart.entity";
import { FavoritesEntity } from "./favorites.entity";
import { CommentsEntity } from "./comments.entity";
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

  @Column({
    nullable: true,
    default: "1739961561390-99",
  })
  photo: string;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @OneToMany(() => CartItemEntity, (cart) => cart.user)
  cartItems: CartItemEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.user)
  favorites: FavoritesEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];

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
}
