import ConfirmModal from '@/components/ui/confirm-modal/confirm-modal';
import {
  StyledCloseIcon,
  StyledDelete,
  StyledPlace,
} from '@/styles/components/place-list.styled';
import { theme } from '@/utils/theme.styled';
import { IPlace } from '@/utils/types/place/place.types';
import { motion, Variants } from 'framer-motion';
import React, { FC, useState } from 'react';

const placeVariants: Variants = {
  initial: { scale: 0 },
  animation: {
    scale: 1,
    transition: { type: 'spring', stiffness: 600, damping: 10 },
  },
};

const deletePlaceVariants: Variants = {
  hidden: { opacity: 0, scale: 0, backgroundColor: theme.colors.primary },
  visible: { opacity: 0, scale: 1, backgroundColor: theme.colors.primary },
  hover: { opacity: 1, scale: 1, backgroundColor: theme.colors.darkWhite },
  tap: { scale: 0 },
};

interface PlaceProps extends IPlace {
  onDelete: Function;
}

const Place: FC<PlaceProps> = ({ placeName, onDelete }) => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  return (
    <>
      <ConfirmModal
        show={showDeleteConfirmModal}
        modalBody={`آدرس ${placeName} حذف شود ؟`}
        buttonText="حذف"
        onCancel={setShowDeleteConfirmModal.bind(null, false)}
        onConfirm={onDelete.bind(null, placeName)}
      />

      <StyledPlace
        as={motion.div}
        variants={placeVariants}
        initial="initial"
        animate="animation"
        exit="initial"
        onClick={setShowDeleteConfirmModal.bind(null, true)}
        layout
      >
        <StyledDelete
          as={motion.div}
          variants={deletePlaceVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <StyledCloseIcon size="2rem" color={theme.colors.primary} />
        </StyledDelete>
        <span>{placeName}</span>
      </StyledPlace>
    </>
  );
};

export default Place;
