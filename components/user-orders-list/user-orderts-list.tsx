import React, { FC } from 'react';
import { motion, Variants } from 'framer-motion';

import { StyledUserOrdersList } from '@/styles/pages/user-orders';
import { IOrdersApiRes } from '@/utils/types/order/order.types';
import ProfileOrderItem from '../profile-order-item/profile-order-item';

interface IUserOrdersListProps {
  userOrders: IOrdersApiRes[] | undefined;
}

const userOrdersVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: 'beforeChildren' },
  },
};

const UserOrdersList: FC<IUserOrdersListProps> = ({ userOrders }) => {
  if (!userOrders) {
    return <></>;
  }

  if (userOrders.length < 1) {
    return <motion.h3>سفارشی برای شما ثبت نشده است !</motion.h3>;
  }

  return (
    <StyledUserOrdersList
      as={motion.div}
      variants={userOrdersVariants}
      initial="initial"
      animate="animation"
    >
      {userOrders.length < 1 ? (
        <motion.h3>سفارشی برای شما ثبت نشده است !</motion.h3>
      ) : (
        userOrders.map((order) => (
          <ProfileOrderItem key={order.id} {...order} />
        ))
      )}
    </StyledUserOrdersList>
  );
};

export default UserOrdersList;
