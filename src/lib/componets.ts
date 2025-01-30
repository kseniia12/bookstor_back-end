export interface responseObjectTodo {
  id?: number;
  text?: string;
  completed?: boolean;
  valueInputField?: string;
  key?: number;
}

export interface userObject {
  fullName?: string;
  email?: string;
  password?: string;
  dob?: string;
  photo?: string;
  newPassword?: string;
}

export interface bookObject {
  name: string;
  priceSoft: number;
  priceHard: number;
  description: string;
  countHard: number;
  countSoft: number;
  bestseller: boolean;
  cover: string;
}

export interface genreObject {
  name: string;
}

export interface genreAndBookObject {
  bookId: number;
  genreId: number;
}

export interface authorAndBookObject {
  bookId: number;
  authorId: number;
}

export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface Book {
  id: number;
  name: string;
  priceSoft: number;
  priceHard: number;
  description: string;
  cover: string;
  countHard: number;
  countSoft: number;
  bestseller: boolean;
}
