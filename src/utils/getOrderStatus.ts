import { GetOrdersReturn } from 'services/orders';

export const getOrderStatus = (
  order: GetOrdersReturn
): 'pending' | 'accepted' | 'packed' | 'delivering' | 'delivered' => {
  if (order.confirmDeliveredOrderBarId && order.confirmDeliveredOrderDeliveryId)
    return 'delivered';
  if (order.confirmOrderPickupId) return 'delivering';
  if (order.confirmPackedOrderStorageId) return 'packed';
  if (order.confirmedOrderStorageId) return 'accepted';

  return 'pending';
};
