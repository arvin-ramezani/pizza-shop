import { motion, Variants } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types';
import { useRouter } from 'next/router';

import { Food as FoodModel } from '@/models/Food';
import { IFood } from '@/utils/types/foods/food.interface';
import { useAppDispatch } from '@/redux/hooks';
import { setLoader } from '@/redux/features/loadingBarSlice';
import FoodImagesCarousel from '@/components/food-images-carousel/food-images-carousel';
import AddToCartBlock from '@/components/add-to-cart-block/add-to-cart-block';
import dbConnect from '@/utils/db/dbConnect';
import {
  Container,
  Details,
  DetailsTitle,
  FoodContainer,
  FoodContent,
  FoodName,
  Integredients,
  TitleBlock,
} from '@/styles/pages/[slug].styled';
import Comment from '@/components/comments/comments';

interface FoodPageProps {
  food: IFood;
}

const foodContentVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animation: {
    opacity: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

const foodItemVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animation: {
    x: 0,
    opacity: 1,
  },
};

const Food: NextPage<FoodPageProps> = ({ food }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoader(100));
  }, [router.pathname]);

  return (
    <FoodContainer as={motion.div}>
      <FoodImagesCarousel images={food.images || ['']} name={food.name} />

      <Container>
        <FoodContent
          as={motion.div}
          variants={foodContentVariants}
          initial="initial"
          animate="animation"
        >
          <TitleBlock variants={foodContentVariants}>
            <motion.div variants={foodItemVariants}>
              <FoodName>{food.name}</FoodName>
              <Integredients>{food.integredients}</Integredients>
            </motion.div>
            <AddToCartBlock
              name={food.name}
              price={food.price}
              image={food.coverImage}
              likes={food.likes}
            />
          </TitleBlock>

          <Details
            variants={foodItemVariants}
            initial="initial"
            animate="animation"
            transition={{ delay: 1.6 }}
          >
            <DetailsTitle variants={foodItemVariants}>طرز تهیه</DetailsTitle>
            <motion.p variants={foodItemVariants}>{food.details}</motion.p>
          </Details>

          <Comment foodSlug={food.slug} />
        </FoodContent>
      </Container>
    </FoodContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  let foods = await FoodModel.find();

  return {
    paths: foods.map((food) => ({
      params: {
        slug: food.slug,
      },
    })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();

  let food = await FoodModel.findOne({ slug: params?.slug });
  food = JSON.parse(JSON.stringify(food));

  return { props: { food } };
};

export default Food;
