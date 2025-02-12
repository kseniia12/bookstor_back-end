import type { NextFunction, Request, Response } from "express";
import config from "../config/config";
import bookServices from "../services/bookServices";
import { handleSingleUploadFile } from "../utils/uploadSingle";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await bookServices.createBook(req.body);
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
    bookServices.uploadingPhotoBook(photo);
    res.status(201).json({
      photo: `${config.server.baseUrl}/upload/${uploadResult.file.filename}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const price = await bookServices.getPriceBooks();
    const book = await bookServices.getBooks(req.query, price);
    res.status(201).json({ book, price });
  } catch (error) {
    next(error);
  }
};

export const getGenresBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const filter = await bookServices.getGenresBooks();
    res.status(201).json({ filter });
  } catch (error) {
    next(error);
  }
};

export const createGenres = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await bookServices.createGenres(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await bookServices.createAuthor(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const addBookToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const book = await bookServices.addBookToCart(userId, req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBookFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const book = await bookServices.getBookFromCart(userId);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBookRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bookId = req.query.bookId as string;
    const book = await bookServices.getBookRecommendation(bookId);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

export const rateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const rate = await bookServices.rateBook(req.user.id, req.body);
    const user = rate.user;
    const ratingBook = rate.ratingBook;
    res.json({ user, ratingBook });
  } catch (error) {
    next(error);
  }
};

export const getBookRating = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const rate = await bookServices.getBookRating();
    res.status(201).json(rate);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await bookServices.addComment(req.body, req.user.id);
    res.status(201).json({
      comment: req.body.comment,
      date: req.body.date,
      user: {
        fullName: user.fullName,
        photo: `${config.server.baseUrl}/upload/${user.photo}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bookId = req.query.bookId as string;
    const book = await bookServices.getComment(bookId);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
