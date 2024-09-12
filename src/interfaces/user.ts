import { UUID } from "crypto";
import { IBaseQuery } from "./baseQuery";

export interface IUser {
  id?: UUID;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: string;
}

export interface IGetUserQuery extends IBaseQuery {}
