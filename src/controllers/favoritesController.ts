import type { NextFunction, Request, Response } from "express";
import {
  addToFavoritesServices,
  getBookFromFavoritesServices,
} from "../services/favoritesServicse";

export const addToFavoritesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const bookData = req.body;
    const book = await addToFavoritesServices({ userId, bookData });
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBookFromFavoritesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const idUser = req.user;
    const book = await getBookFromFavoritesServices(idUser);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
