import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import {
  getAllUsers,
  GetAllUsersResponseType,
  UserType
} from 'src/services/users';

const REFECTCH_INTERVAL = 10000;

type GetAllUsersParamsType = {
  role?: UserType['role'];
};

export const useGetUsers = (
  { role }: GetAllUsersParamsType,
  queryOptions: UseQueryOptions<GetAllUsersResponseType, AxiosError> & {
    enabled?: boolean;
  } = {}
) => {
  const { enabled, ...options } = queryOptions;

  const usersQuery = useQuery(`getAllUsers-${role}`, () => getAllUsers(role));
  return usersQuery;
};
