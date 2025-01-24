import { BookEntity } from "../db/entities/book.entity";
import { AppDataSource } from "../db/dataSource";

export const bookRepository = AppDataSource.getRepository(BookEntity);
