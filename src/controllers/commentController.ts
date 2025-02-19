import type { NextFunction, Request, Response } from "express";
import config from "../config/config";
import commentServices from "../services/commentServices";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await commentServices.addComment(req.body, req.user.id);
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
    const book = await commentServices.getComment(bookId);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
