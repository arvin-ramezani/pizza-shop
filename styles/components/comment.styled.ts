import Input from '@/components/ui/input/input';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledComment = styled(motion.div)`
  padding: 1rem;

  & > h4 {
    margin: 1.5rem 0 0.8rem;
    font-size: 1.2rem;
  }
`;

export const CommentListWrapper = styled.div`
  overflow-y: auto;
  height: 255px;
  direction: ltr;
  margin-right: -0.7rem;

  &::-webkit-scrollbar {
    width: 8px;
    direction: ltr;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
  }
`;

export const StyledCommentList = styled(motion.div)`
  direction: rtl;
  height: 255px;
  margin-right: 0.8rem;
`;

export const CommentBlock = styled(motion.div)`
  margin-top: 0.5rem;
  width: fit-content;
  padding: 0.5rem 2rem;
  background: #f5f5f5;
  border-radius: 0.8rem;

  & > h5 {
    margin: 0;
    font-size: 1rem;
    line-height: 1;
  }
  & > p {
    font-size: 0.8rem;
  }
`;

export const AddCommentForm = styled(motion.form)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > span {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  & textarea {
    margin: 0 !important;
  }
`;

export const StyledCommentInput = styled(motion.div)``;
