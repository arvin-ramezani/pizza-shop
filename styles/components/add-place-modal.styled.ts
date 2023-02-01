import { theme } from '@/utils/theme.styled';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AddPlaceModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background-color: #000000d3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddPlaceModalForm = styled(motion.form)`
  width: clamp(40%, 700px, 80%);
  background: #fff;
  border-radius: 0.5rem;
  padding: 0.3rem;
  height: 80%;
  position: relative;
  overflow: hidden;

  & > span {
    margin: 0.5rem;
  }

  & input:disabled,
  & textarea:disabled {
    color: black;
    font-weight: bold;
  }
`;

export const StyledSpinner = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const FormBody = styled(motion.div)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 75%;
  padding: 1rem;
  /* width: 100%; */

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
  }
`;

export const FormBodyInputsWrapper = styled(motion.div)`
  display: block;
  margin-bottom: 2rem;

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

export const FormFooter = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px -1px 4px 0px ${({ theme }) => theme.colors.darkWhite};

  & button {
    font-size: 0.8rem;
  }
`;

export const StyledEditBtnWrapper = styled(motion.div)``;
