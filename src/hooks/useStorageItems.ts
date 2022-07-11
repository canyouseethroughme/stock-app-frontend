import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getStorageItems, GetStorageItemsReturn } from '../services/storage';

export const useStorageProducts = (
  queryOptions: UseQueryOptions<GetStorageItemsReturn, AxiosError> & {
    enabled?: boolean;
  } = {}
) => {
  const { enabled, ...options } = queryOptions;
  const enabledOverwrite = enabled || enabled === undefined;

  const storageItemsQuery = useQuery('storageItems', getStorageItems);

  return storageItemsQuery;
};
