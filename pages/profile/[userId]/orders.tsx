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
import { StyledLoadingImage } from '@/styles/pages/user-orders';

const loadingImageVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animation: {
    rotate: -360,
    transition: { repeat: Infinity, duration: 0.6, ease: 'linear' },
  },
};

const UserOrdersPage: NextPageWithLayout = () => {
  const { data: userData, status } = useSession();
  const router = useRouter();
  const userId = router.query.userId;

  const { data: userOrders, isLoading } = useGetOrdersQuery(userId as string, {
    skip: !userId || status !== 'authenticated',
  });

  if (status === 'unauthenticated') {
    router.replace('/');
    return <></>;
  }

  return (
    <section>
      {isLoading && (
        <StyledLoadingImage
          as={motion.img}
          variants={loadingImageVariants}
          initial="initial"
          animate="animation"
          src="/images/button/loading.png"
        />
      )}
      <UserOrdersList userOrders={userOrders} />
    </section>
  );
};

UserOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfilePageLayout>{page}</ProfilePageLayout>;
};

export default UserOrdersPage;
