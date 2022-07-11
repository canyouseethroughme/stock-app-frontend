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
