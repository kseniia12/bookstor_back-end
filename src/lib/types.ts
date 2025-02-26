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

export interface IDataForAddFavoritesBook {
  userId: number;
  bookData: {
    bookId: number;
    authorId: number;
  };
}

export interface IDataForFilteringBooks {
  page?: string;
  genre?: string[];
  maxPrice?: string;
  minPrice?: string;
  sort?: string;
}

export interface IRateBook {
  bookId: number;
  rate: number;
}

export interface IResToken {
  id: number;
  email: string;
  fullName: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}
