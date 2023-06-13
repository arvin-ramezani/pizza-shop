import { modalBackdropVariants } from './../../components/ui/add-place-modal/add-place-modal.variants';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledComment = styled(motion.div)`
  margin-top: 3rem;

  & > h4 {
    padding-right: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export const StyledCommentContainer = styled(motion.div)`
  padding: 1rem;
  display: block;

  & > h4 {
    margin: 1.5rem 0 0.8rem;
    font-size: 1.2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    gap: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: flex;
    justify-content: start;
    gap: 5rem;
  }
`;

export const CommentListWrapper = styled.div`
  overflow-y: auto;
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
  min-height: 160px;
  max-height: 255px;
  margin: 0 0.8rem -2rem 0;
`;

export const CommentBlock = styled(motion.div)`
  margin-top: 0.5rem;
  padding: 0.5rem 0.8rem;
  background: #fff;
  border-radius: 0.8rem;
  width: 100%;

  & > h5 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
  }
  & > p {
    font-size: 0.8rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const UserInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  & > h5 {
    margin: 0;
  }
`;

export const StyledMomentBlock = styled(motion.span)`
  font-size: 0.7rem;
  width: 100%;
  display: block;
  text-align: end;
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

export const AddCommentFormBtnContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;
