import { appDataSource } from "../db/dataSource";
import { UserEntity } from "../db/entities/user.entity";

export const userRepository = appDataSource.getRepository(UserEntity);
