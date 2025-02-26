import type { NextFunction, Request, Response } from "express";
import { formDataUser } from "../utils/checkDataUser";

import userServices from "../services/userServices";
import { handleSingleUploadFile } from "../utils/uploadSingle";
import config from "../config/config";
import { generateTokens, jwtVerifyToken } from "../utils/utilsToken";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userServices.createUser(req.body);
    const checkUser = formDataUser(user);
    const accessToken = await generateTokens(
      checkUser,
      "1800s",
      config.token.access,
    );
    const refreshToken = await generateTokens(
      checkUser,
      "7d",
      config.token.refresh,
    );
    res.status(201).json({
      user,
      token: { accessToken: accessToken, refreshToken: refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userServices.loginUser(req.body);
    const checkUser = formDataUser(user);
    const accessToken = await generateTokens(
      checkUser,
      "1800s",
      config.token.access,
    );
    const refreshToken = await generateTokens(
      checkUser,
      "7d",
      config.token.refresh,
    );
    res.status(200).json({
      user,
      token: { accessToken: accessToken, refreshToken: refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadingPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  let uploadResult;
  try {
    uploadResult = await handleSingleUploadFile(req, res);
    const photo = await uploadResult.file.filename;
    const userId = req.user.id;
    userServices.uploadingPhoto({ photo, userId });
    res.status(201).json({
      photo: `${config.server.baseUrl}/upload/${uploadResult.file.filename}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const checkUser = await userServices.getUserById(userId);
    const ratingBook = checkUser.ratingBook;
    const user = formDataUser(checkUser.user);
    res.json({ user, ratingBook });
  } catch (error) {
    next(error);
  }
};

export const editUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.user.id;
    const userData = req.body.user;
    const checkUser = await userServices.editUserById({ id, userData });
    const user = formDataUser(checkUser);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const editPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.user.id;
    const userData = req.body.user;
    await userServices.editPassword({ id, userData });
    res.send({ message: "Ok" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await jwtVerifyToken(req.body.refresh, config.token.refresh);
    const checkUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      photo: user.photo,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    console.log(checkUser);
    const accessToken = await generateTokens(
      checkUser,
      "1800s",
      config.token.access,
    );
    const refreshToken = await generateTokens(
      checkUser,
      "7d",
      config.token.refresh,
    );
    res.status(200).json({
      token: { accessToken: accessToken, refreshToken: refreshToken },
    });
  } catch (error) {
    next(error);
  }
};
