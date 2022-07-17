import axios from 'axios';
import { API_URL } from 'src/config/constants';

type CreateOrderType = {
  itemId: string;
  quantity: number;
  name: string;
};

type CreateOrderReturnType = {
  orderedItems: CreateOrderType[];
  comment?: string;
};

export type GetOrdersReturn = {
  _id: string;
  createdBy: string;
  createdAt: string;
  orderedItems: IOrderItem[];
  comment?: string;
  barName: string;
  confirmedOrderStorageId?: string;
  confirmPackedOrderStorage?: IOrderItem[];
  confirmPackedOrderStorageId?: string;
  confirmOrderPickupId?: string;
  confirmOrderPickedUp?: IOrderItem[];
  confirmDeliveredOrderBarId?: string;
  confirmDeliveredOrderBar: IOrderItem[];
  confirmDeliveredOrderDeliveryId?: string;
  confirmDeliveredOrderDelivery?: IOrderItem[];
};
interface IOrderItem {
  itemId: string;
  quantity: number;
  name: string;
  measurementUnit: string;
}

export const postCreateOrder = async ({
  orderedItems,
  comment
}: CreateOrderReturnType) => {
  const data = axios.post(`${API_URL}/orders/create-order`, {
    orderedItems,
    comment
  });
  return data;
};

export type GetOrdersReturnType = {
  orders: GetOrdersReturn[];
};

export const getOrders = async () => {
  const data = axios.get<GetOrdersReturnType>(`${API_URL}/orders/`);
  console.log(data);
  return data;
};

export type GetOrderByIdReturn = {
  order: GetOrdersReturn;
};

export const getOrderById = async (id: string) => {
  const data = axios.get<GetOrderByIdReturn>(`${API_URL}/orders/${id}`);
  return data;
};

export const confirmOrderStorage = async (id: string) => {
  const data = axios.put(`${API_URL}/orders/confirm-order-storage`, {
    orderId: id
  });
  return data;
};

export const confirmPackedOrder = async (id: string, items: IOrderItem[]) => {
  const data = await axios.put(`${API_URL}/orders/confirm-packed-order`, {
    orderId: id,
    confirmPackedOrderStorage: items
  });
  return data;
};

export const confirmPickedUp = async (id: string, items: IOrderItem[]) => {
  const data = await axios.put(`${API_URL}/orders/confirm-pick-up`, {
    orderId: id,
    confirmOrderPickedUp: items
  });
  return data;
};

export const confirmCompleteOrderBar = async (
  id: string,
  items: IOrderItem[]
) => {
  const data = await axios.put(`${API_URL}/orders/confirm-delivered-bar`, {
    orderId: id,
    confirmedItems: items
  });

  return data;
};
export const confirmCompleteOrderDelivery = async (
  id: string,
  items: IOrderItem[]
) => {
  const data = await axios.put(`${API_URL}/orders/confirm-delivery-delivery`, {
    orderId: id,
    confirmedItems: items
  });

  return data;
};

export const deleteOrder = async (orderId: string) => {
  const data = await axios.delete(`${API_URL}/orders/${orderId}`)

  return data
}

// Alin DK, [17 Jul 2022 at 16.31.50]:
// /orders/edit-order

// put

// body => orderedItems, comment, orderId

// export const editOrder = asunc ()
