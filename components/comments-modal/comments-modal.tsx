import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Comments from '@/components/comments/comments';
import styled from 'styled-components';
import { IFood } from '@/utils/types/foods/food.interface';

interface CommentModalProps {
  onClose: () => void;
  show: boolean;
  foodSlug: IFood['slug'];
}

const commentModalVariants: Variants = {
  initial: { opacity: 0 },
  animation: { opacity: 1 },
  exit: {
    height: 0,
    y: '-100%',
  },
};

const CommentsModal: FC<CommentModalProps> = ({ show, onClose, foodSlug }) => {
  const [mounted, setMounted] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!document.getElementById('commentsModal')) {
      const commentsModal = document.createElement('div');
      commentsModal.setAttribute('id', 'commentsModal');
      commentsModal.style.position = 'fixed';
      commentsModal.style.top = '0';
      commentsModal.style.right = '0';
      commentsModal.style.width = '100%';
      commentsModal.style.zIndex = '4';

      document.body.appendChild(commentsModal);
    }
  }, []);

  const onLoading = (loading: boolean) => {
    console.log(loading);
    // setLoading(loading);
  };

  useEffect(() => {
    if (document) {
      show
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto');
    }
  }, [show]);

  let content = (
    <AnimatePresence>
      {show && (
        <StyledCommentModal
          as={motion.div}
          variants={commentModalVariants}
          initial="initial"
          animate="animation"
          exit="initial"
          key="commentsModal"
          onClick={onClose as MouseEventHandler<HTMLDivElement>}
        >
          <StyledCommentsWrapper onClick={(e) => e.stopPropagation()}>
            <Comments
              // onLoading={onLoading}
              modalMode
              closeModal={onClose}
              foodSlug={foodSlug}
            />
          </StyledCommentsWrapper>
        </StyledCommentModal>
      )}
    </AnimatePresence>
  );

  return mounted
    ? ReactDOM.createPortal(content, document?.getElementById('commentsModal')!)
    : null;
};

export const StyledCommentModal = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCommentsWrapper = styled(motion.div)`
  background: #fff;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  width: 90%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 70%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 50%;
  }
`;

export default CommentsModal;
