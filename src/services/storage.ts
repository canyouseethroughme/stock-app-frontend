import axios from 'axios';
import { API_URL } from 'src/config/constants';

export type StorageItemType = {
  _id: string;
  name: string;
  measurementUnit: string;
  quantity: number;
  category: string;
};

export type GetStorageItemsReturn = {
  items: StorageItemType[];
};

export type StorageItemsByCategory = {
  category: string;
  brands: StorageItemType[];
};

export type GetStorageItemsByCategory = {
  items: StorageItemsByCategory[];
};

export const getStorageItems = async () => {
  const data = axios.get<GetStorageItemsReturn>(`${API_URL}/storage`);
  return data;
};

export const getStorageItemsByCategory = async () => {
  const data = axios.get<GetStorageItemsByCategory>(
    `${API_URL}/storage/by-category`
  );
  return data;
};

export const deleteStorageItem = async (itemId: string) => {
  return await axios.delete(`${API_URL}/storage/${itemId}`);
};

type CreateStorageItemType = {
  item: Omit<StorageItemType, '_id'>;
};

export const createStorageItem = async ({ item }: CreateStorageItemType) => {
  const data = axios.post<StorageItemType>(`${API_URL}/storage`, {
    item: {
      name: item.name,
      category: item.category,
      measurementUnit: item.measurementUnit,
      quantity: item.quantity
    }
  });
  return data;
};

type EditStorageItemType = Omit<StorageItemType, '_id'> & { itemId: string };

export const editStorageItem = async ({
  itemId,
  name,
  quantity,
  measurementUnit,
  category
}: EditStorageItemType) => {
  const data = axios.put<StorageItemType>(`${API_URL}/storage/${itemId}`, {
    item: { name, quantity, measurementUnit, category }
  });
  return data;
};
