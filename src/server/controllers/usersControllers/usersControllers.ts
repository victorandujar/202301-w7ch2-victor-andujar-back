import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import User from "../../../database/models/UserLogin.js";
import {
  type UserRegisterStrucutre,
  type UserCredentials,
} from "../../../types.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import UserRegister from "../../../database/models/UserRegister.js";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    const customError = new CustomError(
      "Wrong credentials",
      401,
      "Wrong credentials"
    );

    next(customError);

    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  res.status(200).json({ token });
};

export const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserRegisterStrucutre
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { adress, email, name, password, phoneNumber } = req.body;
    const image = req.file?.filename;

    const hashedPassword = bcryptjs.hash(password, 10);

    const user = UserRegister.create({
      adress,
      email,
      image,
      name,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({ user });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create the user.",
      500,
      "Couldn't create the user."
    );

    next(customError);
  }
};
