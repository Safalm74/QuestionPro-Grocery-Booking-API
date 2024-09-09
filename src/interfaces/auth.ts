import { Request as expressRequest } from "express";
import { IUser } from "./user";

export interface Request extends expressRequest {
  user?: Omit<IUser, "password">;
}

export interface ITokenPlayLoad {
  id: string;
  name: string;
  email: string;
  role: string;
}
