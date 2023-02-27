import React, {
  CSSProperties,
  Fragment,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import ProfilePageLayout from '@/components/layout/profile-layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { NextPageWithLayout } from '@/pages/_app';
import { useGetOrdersQuery } from '@/redux/features/apiSlice';
import ProfileOrderItem from '@/components/profile-order-item/profile-order-item';
import { motion, Variants } from 'framer-motion';
import UserOrdersList from '@/components/user-orders-list/user-orderts-list';

const UserOrdersPage: NextPageWithLayout = () => {
  const { data: userData, status } = useSession();
  const router = useRouter();
  const userId = router.query.userId;

  const { data: userOrders } = useGetOrdersQuery(userId as string, {
    skip: !userId,
  });

  if (status === 'unauthenticated') {
    router.replace('/');
    return <></>;
  }

  // useEffect(() => {

  // }, [router.query])

  return (
    <section>
      <UserOrdersList userOrders={userOrders || []} />
    </section>
  );
};

UserOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfilePageLayout>{page}</ProfilePageLayout>;
};

export default UserOrdersPage;
