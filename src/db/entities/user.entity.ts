import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RatingEntity } from "./rating.entity";
import { CartItemEntity } from "./cart.entity";
import { FavoritesEntity } from "./favorites.entity";

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

  @OneToMany(() => CartItemEntity, (cart) => cart.user)
  cartItems: CartItemEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.user)
  favorites: FavoritesEntity[];

  // @OneToOne(() => CartItemEntity, (cart) => cart.user)
  // cart: CartItemEntity;
}
