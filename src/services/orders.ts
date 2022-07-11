import axios from 'axios';
import { API_URL } from 'src/config/constants';

type CreateOrderType = {
    itemId: string;
    quantity: number
    name: string;
}

type CreateOrderReturnType = {
    orderedItems: CreateOrderType[],
    comment?: string;
}

export type GetOrdersReturn = {
    _id: string;
    createdBy: string
    createdAt: string
    orderItems: IOrderItem[]
    comment?: string
    barName: string;
    confirmedOrderStorageId?: string
    confirmPackedOrderStorage?: IOrderItem[]
    confirmPackedOrderStorageId?: string
    confirmOrderPickupId?: string
    confirmOrderPickedUp?: IOrderItem[]
    confirmDeliveredOrderBarId?: string
    confirmDeliveredOrderBar: IOrderItem[]
    confirmDeliveredOrderDeliveryId?: string
    confirmDeliveredOrderDelivery?: IOrderItem[]
}
interface IOrderItem {
    itemId: string
    quantity: number
    name: string;
}

export const postCreateOrder = async ({orderedItems, comment}: CreateOrderReturnType) => {
    const data = axios.post(`${API_URL}/orders/create-order`,{orderedItems, comment})
    return data
}

export const getOrders = async () => {
    const data = axios.get(`${API_URL}/orders/`)
    console.log(data);
    return data
}   
    
    
