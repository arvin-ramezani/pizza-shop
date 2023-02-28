import Image from 'next/image';
import React, { CSSProperties, FC, Fragment, useState } from 'react';

import {
  OrderFoodName,
  OrderFoodPrice,
  OrderFoodQuantity,
  OrderFoodsBlock,
  OrderFoodsItem,
  OrderItemHeader,
  OrderItemPlaceAddress,
  ProfileOrderItemPlaceName,
  StyledMapBtnTxt,
  StyledOrderItem,
  TotalPrice,
  TotalPriceBlock,
  TotalPriceText,
  TotalQuantity,
} from '@/styles/components/profile-order-item';
import CloseIcon from '../ui/close-icon/close-icon';
import IconButton from '../ui/icon-button/icon-button';
import { IOrdersApiRes } from '@/utils/types/order/order.types';
import MapModal from '../ui/map-modal/map-modal';
import { ICoordinates } from '@/utils/types/map/map.types';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import priceToText from '@/utils/common/priceTextSeperator';

interface ProfileOrderItemProps extends IOrdersApiRes {}

const userOrdersItemVariants: Variants = {
  initial: { opacity: 0, x: -100 },
  animation: { opacity: 1, x: 0 },
};

const userOrdersItemPlaceNameVariants: Variants = {
  initial: { opacity: 0, scale: 0.4 },
  animation: {
    opacity: 1,
    scale: 1,
  },
};

const ProfileOrderItem: FC<ProfileOrderItemProps> = ({
  foods,
  placeId: orderPlace,
  place,
  totalPrice,
}) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [coordinatesToShow, setCoordinatesToShow] = useState<ICoordinates>();
  const [showAddress, setShowAddress] = useState(false);

  const mapButtonStyles = {
    outline: 'none',
    opacity: 1,
    cursor: 'pointer',
    width: '100%',
    color: 'black',
    gap: '0.2rem',
    fontSize: '.6rem',
    fontWeight: 'bold',
    transform: 'none',
  };

  const closeAddressStyle = {
    position: 'absolute',
    top: '-.6rem',
  } as CSSProperties;

  return (
    <>
      <MapModal
        show={showMapModal}
        onClose={setShowMapModal.bind(null, false)}
        stableCoordinates
        initialCoordinates={coordinatesToShow}
      />

      <StyledOrderItem as={motion.div} variants={userOrdersItemVariants}>
        <OrderItemHeader
          as={motion.div}
          whileHover={{
            cursor: 'pointer',
            backgroundColor: 'rgb(255,122,0)',
            background:
              'linear-gradient(270deg, rgba(255,122,0,1) 0%, rgba(242,187,0,1) 49%, rgba(228,255,0,1) 100%)',
            transition: { duration: 0.5 },
          }}
          transition={{ duration: 0.5 }}
        >
          <ProfileOrderItemPlaceName
            variants={userOrdersItemPlaceNameVariants}
            initial="initial"
            animate="animation"
            onClick={setShowAddress.bind(null, true)}
          >
            {orderPlace?.name || place?.placeName}
          </ProfileOrderItemPlaceName>
          <AnimatePresence>
            {showAddress && (
              <Fragment key="OrderPlaceAddress">
                <OrderItemPlaceAddress
                  as={motion.div}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '50%' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  {orderPlace?.address || place?.placeAddress}
                </OrderItemPlaceAddress>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={closeAddressStyle}
                >
                  <CloseIcon
                    onClick={setShowAddress.bind(null, false)}
                    size="24px"
                  />
                </motion.span>
              </Fragment>
            )}
          </AnimatePresence>
          <IconButton
            onClick={() => {
              setCoordinatesToShow({
                lng:
                  orderPlace?.location?.coordinates[0] ||
                  place?.placeLocation?.coordinates[0]!,
                lat:
                  orderPlace?.location?.coordinates[1] ||
                  place?.placeLocation?.coordinates[1]!,
              });
              setShowMapModal(true);
            }}
            tapEffect
            style={mapButtonStyles}
            wrapperStyles={{ marginRight: 'auto', outline: 'none' }}
          >
            <StyledMapBtnTxt>مشاهده روی نقشه</StyledMapBtnTxt>
            <Image
              src="/images/map-icon-transp.png"
              alt="map icon"
              width="24"
              height="38"
            />
          </IconButton>
        </OrderItemHeader>
        <OrderFoodsBlock>
          {foods.map((food) => (
            <OrderFoodsItem key={food._id}>
              <OrderFoodName>{food.foodName}</OrderFoodName>
              <OrderFoodQuantity>{food.quantity} عدد</OrderFoodQuantity>
              <OrderFoodPrice>
                {priceToText(+food.foodPrice, food.quantity)}

                <Image
                  src="/images/price.svg"
                  alt="price"
                  width={24}
                  height={24}
                />
              </OrderFoodPrice>
            </OrderFoodsItem>
          ))}
          <TotalPriceBlock>
            <TotalPrice>جمع</TotalPrice>
            <TotalQuantity>{foods.length} عدد</TotalQuantity>
            <TotalPriceText>
              {priceToText(totalPrice)}
              <Image
                src="/images/price.svg"
                alt="price"
                width={24}
                height={24}
              />
            </TotalPriceText>
          </TotalPriceBlock>
        </OrderFoodsBlock>
      </StyledOrderItem>
    </>
  );
};

export default ProfileOrderItem;
