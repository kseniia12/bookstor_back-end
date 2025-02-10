import type { NextFunction, Request, Response } from "express";
import {
  addCommentServices,
  addToCartServices,
  connectingAuthorBooksServices,
  connectingGenresBooksServices,
  createAuthorServices,
  createBookPhoto,
  createBookServices,
  createGenresServices,
  getBookFromCartServices,
  getCommentServices,
  getFilterServices,
  getPriceBooks,
  getrateBookServices,
  getReccomendationsBookServices,
  paginationBookService,
  rateBookServices,
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
    res.status(201).json({ book, price });
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

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const idUser = req.user.id;
    const book = await addToCartServices(idUser, req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBookFromCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const idUser = req.user;
    const book = await getBookFromCartServices(idUser);
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReccomendationsBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await getReccomendationsBookServices(req.query.bookId);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const rateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const rate = await rateBookServices(req.user.id, req.body);
    const user = rate.user;
    const ratingBook = rate.ratingBook;
    res.json({ user, ratingBook });
  } catch (error) {
    next(error);
  }
};

export const getrateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const rate = await getrateBookServices();
    res.status(201).json(rate);
  } catch (error) {
    next(error);
  }
};

export const addCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await addCommentServices(req.body, req.user.id);
    res.status(201).json({
      comment: req.body.comment,
      date: req.body.date,
      user: {
        fullName: user.fullName,
        photo: `http://localhost:4000/upload/${user.photo}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await getCommentServices(req.query.bookId);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
