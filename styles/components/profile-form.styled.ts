import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 80%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 70%;
  }

  & h2 {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.6rem;
  }
  /* 
  & input:disabled {
    background-color: #fff;
  } */
`;

export const ProfileImageWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
  position: relative;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 50%;
    display: none;
  }

  & > span {
    position: absolute;
    bottom: -10px;
    left: -10px;
  }
`;

export const InputWrapper = styled.div`
  display: block;

  & > div {
    margin: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

export const FormButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  button {
    width: 80px;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 150px;
    }
  }
`;

export const StyledEditBtnWrapper = styled(motion.div)`
  display: inline-flex;
`;
