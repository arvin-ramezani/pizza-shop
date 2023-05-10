import { motion } from 'framer-motion';
import styled from 'styled-components';

import { IFoodSection } from '../../../utils/types/foods/food.interface';
import FoodItem from './food-item';

const FoodList = ({ foodList }: { foodList: IFoodSection['foods'] }) => {
  return (
    <FoodsContainer>
      {foodList.map((food) => (
        <FoodItem key={food.name} {...food} />
      ))}
    </FoodsContainer>
  );
};

const FoodsContainer = styled(motion.div)`
  display: flex;
  overflow: auto hidden;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
  }
`;

export default FoodList;
