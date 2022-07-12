import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import {
  getOrders,
  GetOrdersReturn,
  GetOrdersReturnType
} from '../services/orders';

const REFECTCH_INTERVAL = 10000;

export const useGetOrders = (
  queryOptions: UseQueryOptions<GetOrdersReturnType, AxiosError> & {
    enabled?: boolean;
  } = {}
) => {
  const { enabled, ...options } = queryOptions;

  const storageItemsQuery = useQuery('getOrdersReturn', getOrders);
  return storageItemsQuery;
};
