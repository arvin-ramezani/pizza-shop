import { IOrdersApiRes } from '@/utils/types/order/order.types';
import React, { FC } from 'react';
import ProfileOrderItem from '../profile-order-item/profile-order-item';

interface UserOrdersListProps {
  userOrders: IOrdersApiRes[];
}

const UserOrdersList: FC<UserOrdersListProps> = ({ userOrders }) => {
  return (
    <>
      {userOrders &&
        userOrders.map((order, index) => (
          <ProfileOrderItem key={order.id} {...order} index={index} />
        ))}
    </>
  );
};

export default UserOrdersList;
