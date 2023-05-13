import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import {
  StyledLoadingImage,
  StyledLoadingImageWrapper,
  StyledUserOrdersList,
  UserOrdersButtonsContainer,
  UserOrdersPagination,
  UserOrdersPaginationSelectBox,
  UserOrdersPaginationText,
} from '@/styles/pages/user-orders.styled';
import ButtonSm from '../ui/button-sm/button-sm';
import { theme } from '@/utils/theme.styled';
import { useGetOrdersQuery } from '@/redux/features/apiSlice';
import UserOrdersList from '../user-orders-list/user-orders-list';
import {
  loadingImageVariants,
  userOrdersVariants,
} from './user-order-section.variants';

const UserOrdersSection: FC = () => {
  const { status } = useSession();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();

  const userId = router.query.userId as string;

  const {
    data: userOrders,
    isLoading,
    isFetching,
  } = useGetOrdersQuery(
    { userId, page },
    {
      skip: !userId || status !== 'authenticated',
    }
  );

  function onPrevPage() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function onNextPage() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  useEffect(() => {
    if (userOrders) {
      setPageCount(userOrders.pagination.pageCount);
    }
  }, [userOrders]);

  if (!userOrders) {
    return <></>;
  }

  if (userOrders.orders.length < 1) {
    return <motion.h3>سفارشی برای شما ثبت نشده است !</motion.h3>;
  }

  return (
    <>
      <AnimatePresence>
        {isFetching && (
          <StyledLoadingImageWrapper
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="userOrdersLoadingSpinner"
          >
            <StyledLoadingImage
              as={motion.img}
              variants={loadingImageVariants}
              initial="initial"
              animate="animation"
              src="/images/button/loading.png"
            />
          </StyledLoadingImageWrapper>
        )}
      </AnimatePresence>

      <StyledUserOrdersList
        as={motion.div}
        variants={userOrdersVariants}
        initial="initial"
        animate="animation"
      >
        <UserOrdersList userOrders={userOrders.orders} />
      </StyledUserOrdersList>
      <UserOrdersPagination>
        <UserOrdersPaginationText>
          <span>صفحه: {page}</span>
          <span>تعداد صفحات: {pageCount}</span>

          <UserOrdersPaginationSelectBox
            value={page}
            onChange={(e) => {
              if (page === +e.target.value) return;
              return setPage(+e.target.value);
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
          </UserOrdersPaginationSelectBox>
        </UserOrdersPaginationText>

        <UserOrdersButtonsContainer>
          <ButtonSm
            text="قبلی"
            onClick={onPrevPage}
            disabled={page === 1}
            color={theme.colors.blue}
            style={{ transform: 'scale(.8)' }}
          />

          <ButtonSm
            text="بعدی"
            onClick={onNextPage}
            disabled={page === pageCount}
            color={theme.colors.blue}
            style={{ transform: 'scale(.8)' }}
          />
        </UserOrdersButtonsContainer>
      </UserOrdersPagination>
    </>
  );
};

export default UserOrdersSection;
