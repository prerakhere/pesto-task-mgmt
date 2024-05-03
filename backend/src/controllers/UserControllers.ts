import { Request, Response } from "express";
import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";


const userService = new UserService(new UserRepository());


async function getUserId(req: Request, res: Response) {
  try {
    const { emailId } = req.query;
    const userData = await userService.getUserId(emailId as string);
    res.json({ userData });
  } catch (e: any) {
    console.log("getUserId ", e);
    res.status(500).json({ error: '500 getUserId' });
  }
}

async function saveUser(req: Request, res: Response) {
  try {
    const { emailId } = req.body;
    const isUserSaved = await userService.saveUser(emailId as string);
    if (!isUserSaved) throw new Error("user not saved");
    res.json({ message: "user saved" });
  } catch (err) {
    res.status(500).json({ error: "500 saveUser" });
  }
}


export {
  getUserId,
  saveUser
};