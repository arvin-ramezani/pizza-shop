import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Order: NextPage = () => {
  const router = useRouter();
  console.log(router.asPath, 'path');
  return (
    <div>
      Order <br /> {router.asPath}
    </div>
  );
};

export default Order;
