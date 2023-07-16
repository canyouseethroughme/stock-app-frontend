import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'src/config/constants';

type LoginType = {
  username: string;
  password: string;
};

type LoginResponseType = {
  token: string;
};

export const login = async ({ username, password }: LoginType) => {
  const data = axios.post<LoginResponseType>(`${API_URL}/users/login`, {
    username,
    password
  });
  return data;
};

export type UserType = {
  _id?: string;
  username: string;
  password?: string;
  role: 'admin' | 'storage' | 'bar' | 'delivery';
  barName?: string;
};

export type GetAllUsersResponseType = {
  users: UserType[];
};

export const getAllUsers = async (role?: UserType['role']) => {
  const data = axios.get<GetAllUsersResponseType>(
    `${API_URL}/users/getUsersByCategory?role=${role}`,
    {}
  );
  return data;
};

export const createUser = async (item: UserType) => {
  const data = axios.post<UserType>(`${API_URL}/users/create`, {
    username: item.username,
    password: item.password,
    role: item.role,
    barName: item.barName
  });
  return data;
};
export const deleteUser = async (itemId: string) => {
  return await axios.delete<unknown>(`${API_URL}/users/delete/${itemId}`);
};
