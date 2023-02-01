import { AnimatePresence, Variants } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../backdrop/backdrop';
import ButtonSm from '../button-sm/button-sm';
import { theme } from '@/utils/theme.styled';
import {
  Modal,
  ModalActionButtonContainer,
  ModalBody,
  StyledConfirmModal,
} from '@/styles/components/confirm-modal.styled';

interface confirmModalProps {
  modalBody?: React.ReactNode;
  show: boolean;
  onConfirm: Function;
  onCancel: Function;
  buttonText?: string;
}

const modalVariants: Variants = {
  hidden: {
    y: -150,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { when: 'beforeChildren' },
  },
};

const modalBodyVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.05 },
  },
};

const ConfirmModal: FC<confirmModalProps> = ({
  modalBody,
  show,
  onConfirm,
  onCancel,
  buttonText,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!document.getElementById('confirmModal')) {
      const confirmModalDiv = document.createElement('div');
      confirmModalDiv.setAttribute('id', 'confirmModal');
      confirmModalDiv.style.position = 'fixed';
      confirmModalDiv.style.top = '0';
      confirmModalDiv.style.right = '0';
      confirmModalDiv.style.width = '100%';
      confirmModalDiv.style.zIndex = '4';

      document.body.appendChild(confirmModalDiv);
    }
  }, []);

  const onConfirmClick = () => {
    onConfirm();
    onCancel(false);
  };

  const onCancelClickHandler = () => {
    onCancel(false);
  };

  let content = (
    <AnimatePresence>
      {show && (
        <StyledConfirmModal
          layout
          key="confirm-modal"
          onClick={onCancelClickHandler}
        >
          {/* <Backdrop onClick={onCancelClickHandler} /> */}

          <Modal
            layout
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ModalBody>{modalBody}</ModalBody>
            <ModalActionButtonContainer variants={modalBodyVariants}>
              <ButtonSm
                text="لغو"
                onClick={onCancelClickHandler}
                color={theme.colors.darkWhite}
                textColor={theme.colors.dark}
              />
              <ButtonSm
                text={buttonText ? buttonText : 'بله'}
                onClick={onConfirmClick}
              />
            </ModalActionButtonContainer>
          </Modal>
        </StyledConfirmModal>
      )}
    </AnimatePresence>
  );

  return mounted
    ? ReactDOM.createPortal(content, document?.getElementById('confirmModal')!)
    : null;
};

export default ConfirmModal;
