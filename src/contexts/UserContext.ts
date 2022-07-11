import { createContext, Dispatch, SetStateAction } from 'react';

export type UserType = {
  userId: string;
  role: 'bar' | 'delivery' | 'storage' | 'admin';
  username: string;
  barName?: string;
  token: string;
};

const UserContext = createContext<{
  userData?: UserType;
  setUserData?: Dispatch<SetStateAction<UserType | undefined>>;
}>({});

export default UserContext;
