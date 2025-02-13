import type { NextFunction, Request, Response } from "express";
import cartServices from "../services/cartServices";

export const deleteBookFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await cartServices.deleteBookFromCart(req.body.id, req.user.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const changeCountBooksInCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await cartServices.changeCountBooksInCart(
      req.user.id,
      req.body,
    );
    res.status(200).json(book);
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
    const book = await cartServices.addBookToCart(userId, req.body);
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
    const book = await cartServices.getBookFromCart(userId);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
