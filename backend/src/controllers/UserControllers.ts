import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";


const userService = new UserService(new UserRepository());


async function getUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const { emailId } = req.query;
    const userId = await userService.getUserId(emailId as string);
    res.json({ userId });
  } catch (err) {
    next(err);
  }
}

async function saveUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { emailId } = req.body;
    await userService.saveUser(emailId as string);
    res.json({ message: "user saved" });
  } catch (err) {
    next(err);
  }
}


export {
  getUserId,
  saveUser
};