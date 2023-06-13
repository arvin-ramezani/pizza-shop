import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Comments from '@/components/comments/comments';
import { IFood } from '@/utils/types/foods/food.interface';
import { commentModalVariants } from './comments-modal.variants';
import {
  StyledCommentModal,
  StyledCommentsWrapper,
} from '@/styles/components/comments-modal.styled';

interface CommentModalProps {
  onClose: () => void;
  show: boolean;
  foodSlug: IFood['slug'];
}

const CommentsModal: FC<CommentModalProps> = ({ show, onClose, foodSlug }) => {
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    if (document && show) {
      document.body.style.overflow = 'hidden';
      console.log('commentModal');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

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
            <Comments modalMode closeModal={onClose} foodSlug={foodSlug} />
          </StyledCommentsWrapper>
        </StyledCommentModal>
      )}
    </AnimatePresence>
  );

  return mounted
    ? ReactDOM.createPortal(content, document?.getElementById('commentsModal')!)
    : null;
};

export default CommentsModal;
