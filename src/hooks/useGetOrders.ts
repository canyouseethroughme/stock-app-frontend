import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getOrders, GetOrdersReturn } from '../services/orders';

const REFECTCH_INTERVAL = 10000

export const useGetOrders = (
    queryOptions: UseQueryOptions<GetOrdersReturn, AxiosError> & {
    enabled?: boolean;
    } = {}
) => {
    const { enabled, ...options} = queryOptions;

    const storageItemsQuery = useQuery('getOrdersReturn', getOrders);
    return storageItemsQuery
}