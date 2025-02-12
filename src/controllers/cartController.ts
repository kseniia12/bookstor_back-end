import type { NextFunction, Request, Response } from "express";
import cartServices from "../services/cartServices";

export const deleteBookFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const totalPrice = await cartServices.deleteBookFromCart(
      req.body.id,
      req.user.id,
    );
    res.status(200).json({ totalPrice: totalPrice });
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
