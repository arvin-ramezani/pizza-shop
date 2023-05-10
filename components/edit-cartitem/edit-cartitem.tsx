import React, { FC, useEffect, useState } from 'react';

import ButtonSm from '../ui/button-sm/button-sm';
import {
  AnimationControls,
  motion,
  useAnimation,
  Variants,
} from 'framer-motion';
import IconButton from '../ui/icon-button/icon-button';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { ICartItem } from '@/utils/types/cart/cart.interface';
import {
  Container,
  EditBtnsWrapper,
  ItemEdit,
  QuantityTxt,
} from '@/styles/components/edit-cart-item.styled';

interface EditCartitemProps {
  addQuantity: React.MouseEventHandler<HTMLDivElement>;
  removeQuantity: React.MouseEventHandler<HTMLDivElement>;
  quantityAnimController: AnimationControls;
  toggleHandler: () => void;
  currentQuantity: ICartItem['quantity'];
  initialQuantity: ICartItem['quantity'];
  onEdit: Function;
}

const editCartitemVariants: Variants = {
  containerInitial: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  containerAnimation: {
    width: '100%',
    height: '100%',
    opacity: 1,
    borderRadius: '12px',
    background: 'linear-gradient(270deg, black 20%, #000000a8',
  },
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  quantityTextAnimation: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
};

const EditCartitem: FC<EditCartitemProps> = ({
  addQuantity,
  removeQuantity,
  toggleHandler,
  currentQuantity,
  quantityAnimController,
  onEdit,
}) => {
  const [quantity] = useState(currentQuantity);

  const onEditHandler = () => {
    onEdit();
    toggleHandler();
  };

  return (
    <ItemEdit
      variants={editCartitemVariants}
      animate="containerAnimation"
      initial="containerInitial"
      exit="containerInitial"
    >
      <Container>
        {
          <>
            <QuantityTxt
              variants={editCartitemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.span animate={quantityAnimController}>
                {currentQuantity}
              </motion.span>{' '}
              عدد
            </QuantityTxt>
            <EditBtnsWrapper
              variants={editCartitemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <IconButton onClick={addQuantity} tapEffect>
                <IoMdAddCircleOutline color={'#9747FF'} size={'1.6rem'} />
              </IconButton>

              <IconButton onClick={removeQuantity} tapEffect>
                <IoMdRemoveCircleOutline color={'#9747FF'} size={'1.6rem'} />
              </IconButton>
            </EditBtnsWrapper>
            <ButtonSm
              onClick={onEditHandler}
              text="تغییر"
              disabled={quantity === currentQuantity}
            />
          </>
        }
      </Container>
    </ItemEdit>
  );
};

export default EditCartitem;
