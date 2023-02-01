import AuthModal from '@/components/auth-modal/auth-modal';
import { toggleModal } from '@/redux/features/authSlice';
import { RootState } from '@/redux/store';
import { AnimatePresence } from 'framer-motion';
import React, {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '../backdrop/backdrop';

const AnimateAuthModal = () => {
  const { showModal } = useSelector(({ auth }: RootState) => auth);
  const dispatch = useDispatch();

  const toggleModalHandler = () => {
    dispatch(toggleModal());
  };

  // Prevent body to scroll when the modal is opened.
  useEffect(() => {
    if (document) {
      showModal
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto');
    }
  }, [showModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <Backdrop key="backdrop" onClick={toggleModalHandler} />
          <AuthModal
            key="authModal"
            show={showModal}
            onClose={toggleModalHandler}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimateAuthModal;
