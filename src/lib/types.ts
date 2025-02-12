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

export interface cartObject {
  bookId: number;
  count: number;
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

export interface IUserDataForLogin {
  email: string;
  password: string;
}

export interface ICreateUsersPhoto {
  photo: string;
  userId: number;
}

export interface IEditUserById {
  id: number;
  userData: {
    password: string;
    newPassword: string;
  };
}

export interface IAddFavorites {
  userId: number;
  bookData: authorAndBookObject;
}

export interface IFilterBook {
  page?: string;
  filter?: string[];
  maxPrice?: string;
  minPrice?: string;
  sort?: string;
}

export interface IPrice {
  minValue: number;
  maxValue: number;
}

export interface IRateBook {
  bookId: number;
  rate: number;
}
