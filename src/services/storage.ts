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

export const getStorageItems = async () => {
  const data = axios.get<GetStorageItemsReturn>(`${API_URL}/storage`);
  return data;
};
