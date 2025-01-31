import type { NextFunction, Request, Response } from "express";
import {
  connectingAuthorBooksServices,
  connectingGenresBooksServices,
  createAuthorServices,
  createBookPhoto,
  createBookServices,
  createGenresServices,
  getFilterServices,
  getPriceBooks,
  paginationBookService,
} from "../services/bookServices";
import { handleSingleUploadFile } from "../utils/uploadSingle";

export const createBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await createBookServices(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const uploadingPhotoBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  let uploadResult;
  try {
    uploadResult = await handleSingleUploadFile(req, res);
    const photo = await uploadResult.file.filename;
    createBookPhoto(photo);
    res.status(201).json({
      photo: `http://localhost:4000/upload/${uploadResult.file.filename}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaginationBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const price = await getPriceBooks();
    const book = await paginationBookService(req, price);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const getFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const filter = await getFilterServices();
    res.status(201).json({ filter });
  } catch (error) {
    next(error);
  }
};

export const createGenresController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await createGenresServices(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const connectingGenresBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await connectingGenresBooksServices(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const createAuthorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await createAuthorServices(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const connectingAuthorBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await connectingAuthorBooksServices(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};
