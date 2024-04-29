import { Request, Response } from "express";
import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";


const userService = new UserService(new UserRepository());


async function getUserData(req: Request, res: Response) {
  try {
    const { emailId } = req.query;
    const userData = await userService.getUserData(emailId as string);
    res.json({ userData });
  } catch (e: any) {
    console.log("getUserData ", e);
    res.status(500).json({ error: '500 getUserData' });
  }
}


export {
  getUserData
};