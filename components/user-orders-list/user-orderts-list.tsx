import { StyledUserOrdersList } from '@/styles/pages/user-orders';
import { IOrdersApiRes } from '@/utils/types/order/order.types';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import React, { FC } from 'react';
import ProfileOrderItem from '../profile-order-item/profile-order-item';

interface IUserOrdersListProps {
  userOrders: IOrdersApiRes[];
}

const userOrdersVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: 'beforeChildren' },
  },
};

const UserOrdersList: FC<IUserOrdersListProps> = ({ userOrders }) => {
  const router = useRouter();

  if (!userOrders || userOrders.length < 1) {
    return <></>;
  }
  return (
    <StyledUserOrdersList
      as={motion.div}
      variants={userOrdersVariants}
      initial="initial"
      animate="animation"
    >
      {userOrders.map((order) => (
        <ProfileOrderItem key={order.id} {...order} />
      ))}
    </StyledUserOrdersList>
  );
};

export default UserOrdersList;
