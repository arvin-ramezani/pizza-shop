import React, { FC, useState } from 'react';
import { AnimationControls, motion, Variants } from 'framer-motion';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import ButtonSm from '../ui/button-sm/button-sm';
import IconButton from '../ui/icon-button/icon-button';
import { ICartItem } from '@/utils/types/cart/cart.interface';
import {
  Container,
  EditBtnsWrapper,
  ItemEdit,
  QuantityTxt,
} from '@/styles/components/edit-cart-item.styled';
import { editCartitemVariants } from './edit-cartitem.variants';

interface EditCartitemProps {
  addQuantity: React.MouseEventHandler<HTMLDivElement>;
  removeQuantity: React.MouseEventHandler<HTMLDivElement>;
  quantityAnimController: AnimationControls;
  toggleHandler: () => void;
  currentQuantity: ICartItem['quantity'];
  initialQuantity: ICartItem['quantity'];
  onEdit: Function;
}

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
