import type { NextFunction, Request, Response } from "express";
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
    res.status(200).json({
      photo: `${uploadResult.file.filename}`,
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
    const books = await bookServices.getBooks(req.query, price);
    const { book, meta } = books;
    res.status(200).json({ book: book, price, meta: meta, filters: req.query });
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
    res.status(200).json({ filter });
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

export const getBookRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bookId = req.query.bookId as string;
    const book = await bookServices.getBookRecommendation(bookId);
    res.status(200).json({ book });
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
    res.status(200).json(rate);
  } catch (error) {
    next(error);
  }
};
