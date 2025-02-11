import type { NextFunction, Request, Response } from "express";
import {
  deleteBookFromCartServices,
  patchBookFromCartServices,
} from "../services/cartServices";

export const deleteBookFromCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await deleteBookFromCartServices(req.body.id, req.user.id);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const patchCountBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await patchBookFromCartServices(req.user.id, req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
