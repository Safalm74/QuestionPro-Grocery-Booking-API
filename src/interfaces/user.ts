import { IBaseQuery } from "./baseQuery";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}

export interface IGetUserQuery extends IBaseQuery {}
