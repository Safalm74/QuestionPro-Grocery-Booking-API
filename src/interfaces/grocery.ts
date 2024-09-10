import { IBaseQuery } from "./baseQuery";

export interface IGrocery {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IGroceryQuery extends IBaseQuery {}
