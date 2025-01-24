import type { NextFunction, Request, Response } from "express";
import {
  createBookPhoto,
  createBookServices,
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
    const book = await paginationBookService(req);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};
