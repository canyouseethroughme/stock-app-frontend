import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getStorageItems, GetStorageItemsReturn, getStorageItemsByCategory, GetStorageItemsByCategory } from '../services/storage';

export const useStorageProducts = (
  queryOptions: UseQueryOptions<GetStorageItemsReturn, AxiosError> & {
    enabled?: boolean;
  } = {}
) => {
  const { enabled, ...options } = queryOptions;

  const storageItemsQuery = useQuery('storageItems', getStorageItems);

  return storageItemsQuery;
};

export const useStorageProductsByCategory = (
  queryOptions: UseQueryOptions<GetStorageItemsByCategory, AxiosError> & {
    enabled?: boolean;
  } = {}
) => {
  const { enabled, ...options} = queryOptions;

  const storageItemsQuery = useQuery('storageItemsByCategory', getStorageItemsByCategory);
  return storageItemsQuery
}
