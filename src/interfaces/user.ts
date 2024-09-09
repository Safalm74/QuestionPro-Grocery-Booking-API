export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}

export interface IGetUserQuery {
  id?: string;
  page?: number;
  size?: number;
}
