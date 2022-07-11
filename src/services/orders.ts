import axios from 'axios';
import { API_URL } from 'src/config/constants';

type CreateOrderType = {
    itemId: string;
    quantity: number
}

type CreateOrderReturnType = {
    items: CreateOrderType[],
    comment?: string;
}

export const postCreateOrder = async ({items, comment}: CreateOrderReturnType) => {
    const data = axios.post(`${API_URL}/orders/create-order`,{items, comment})
    return data
}
    
    
