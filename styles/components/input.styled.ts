import { motion, motionValue } from 'framer-motion';
import styled from 'styled-components';
import { Property } from '@/node_modules/csstype/index';
import { BooleanEnum } from '@/utils/types/common/common.types';

export const StyledTextBox = styled.div<{ textarea: boolean }>`
  margin-bottom: 1rem;
  width: 100%;
  height: ${({ textarea }) => (textarea ? '140px' : '80px')};
`;

export const StyledLabel = styled.label`
  font-size: 0.8rem;
  display: block;
  margin-bottom: 0.2rem;
`;

export const StyledInput = styled(motion.input)<{ invalid?: BooleanEnum }>`
  border-radius: 0.5rem;
  text-indent: 0.6rem;
  padding: 0.2rem 0;
  font-family: Vazir;
  width: 100%;
  border: ${({ invalid }) =>
    invalid === BooleanEnum.TRUE ? '2px solid red' : '1px solid black'};

  &:focus {
    outline: 1px solid #000;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.darkWhite};
  }
`;

export const StyledTextarea = styled(motion.textarea)<{
  invalid?: BooleanEnum;
}>`
  border-radius: 0.5rem;
  font-family: Vazir;
  padding: 0.6rem;
  resize: none;
  width: 100%;
  border: ${({ invalid }) =>
    invalid === BooleanEnum.TRUE ? '2px solid red' : '1px solid black'};

  &:focus {
    outline: 1px solid #000;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.darkWhite};
  }
`;

export const ErrorText = styled(motion.span)<{
  margin?: Property.Margin<string | number> | undefined;
}>`
  margin-top: 0.2rem;
  margin: ${({ margin }) => margin};
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
  display: block;
`;
