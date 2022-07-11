import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'src/config/constatns';

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
