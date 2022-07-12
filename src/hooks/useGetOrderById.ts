import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getOrderById, GetOrderByIdReturn } from '../services/orders';

type GetOrderByIdType = {
  id: string;
};

export const useGetOrderById = (
  { id }: GetOrderByIdType,
  queryOptions: UseQueryOptions<GetOrderByIdReturn, AxiosError> & {
    enabled?: boolean;
  } = {}
) => {
  return useQuery('getOrderById', () => getOrderById(id));
};
