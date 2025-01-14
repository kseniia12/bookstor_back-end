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
