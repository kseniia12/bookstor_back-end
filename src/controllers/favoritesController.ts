import type { NextFunction, Request, Response } from "express";
import favoritesServicse from "../services/favoritesServices";

export const addBookInFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const bookData = req.body;
    const book = await favoritesServicse.addBookInFavorites({
      userId,
      bookData,
    });
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBookInFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const idUser = req.user;
    const book = await favoritesServicse.getBookInFavorites(idUser);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
