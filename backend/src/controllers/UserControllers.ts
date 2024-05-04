import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";
import { signUpValidator } from "../utils/PayloadValidators";
import BaseError from "../utils/ErrorHandler";


const userService = new UserService(new UserRepository());


async function getUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = signUpValidator(req.query);
    if (error) throw new BaseError(400, "no email provided");
    const { email } = req.query;
    const userId = await userService.getUserId(email as string);
    res.json({ userId });
  } catch (err) {
    next(err);
  }
}

async function saveUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error, value } = signUpValidator(req.body);
    if (error) throw new BaseError(400, "invalid payload");
    const { email } = req.body;
    await userService.saveUser(email as string);
    res.json({ message: "user saved" });
  } catch (err) {
    next(err);
  }
}


export {
  getUserId,
  saveUser
};