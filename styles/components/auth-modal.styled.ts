import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const StyledModal = styled.div`
  width: clamp(40%, 700px, 80%);
  overflow: hidden auto;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  max-height: 60vh;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    /* width: 700px; */

    & button {
      align-self: flex-end;
    }
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCloseButton = styled.div`
  position: absolute;
  top: -5px;
  right: 0px;
`;

export const StyledForm = styled.form`
  margin: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

export const ProfileImageWrapper = styled.div`
  display: inline-flex;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;

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
`;

export const AuthInputWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    gap: 0.8rem;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  & button {
    width: 150px;
    padding: 0.3rem;
    font-size: 0.9rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;

    align-items: flex-end;
    width: 80%;
    margin: 0 auto;
  }
`;

export const IssueContainer = styled(motion.div)``;

export const IssueBtnContainer = styled(motion.div)`
  direction: ltr;
  display: flex;
  gap: 1rem;
`;
