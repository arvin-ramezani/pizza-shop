import React, {
  FC,
  ForwardedRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { Property } from '@/node_modules/csstype/index';

import { IFormInputs } from '../../../utils/types/auth.types';
import {
  ErrorText,
  StyledInput,
  StyledLabel,
  StyledTextarea,
  StyledTextBox,
} from '@/styles/components/input.styled';
import { CommentFieldValues } from '@/utils/types/comments/comment.interfaces';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useAnimationControls,
  Variants,
} from 'framer-motion';

const triggerAnimateVariants: Variants = {
  animation: { x: [30, -20, 10, -5, 5, 0], transition: { duration: 0.5 } },
};

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  textarea?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  name: string;
  value?: string;
  register?: UseFormRegister<any>;
  errorMessage?: string;
  textbox?: boolean;
  errorTextMargin?: Property.Margin<string | number> | undefined;
  height?: Property.Height<string | number> | undefined;
  defaultValue?: string;
}

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

const Input: FC<InputProps> = ({
  label,
  type,
  onChange,
  textarea,
  placeholder,
  name,
  required,
  register,
  invalid,
  disabled,
  errorMessage,
  textbox,
  value,
  errorTextMargin,
  height,
  defaultValue,
}) => {
  const placeNameRef = useRef<HTMLInputElement>();
  const placeAddressRef = useRef<HTMLTextAreaElement>();

  const inputAnimationController = useAnimationControls();

  return (
    <StyledTextBox
      style={height ? { height: height } : {}}
      textarea={textarea || false}
    >
      <StyledLabel
        htmlFor={name as string}
        style={{ color: `${invalid ? 'red' : 'black'}` }}
      >
        {label} {required && '*'}
      </StyledLabel>
      {textarea ? (
        <StyledTextarea
          as={motion.textarea}
          // variants={triggerAnimateVariants}
          animate={inputAnimationController}
          ref={placeAddressRef as MutableRefObject<HTMLTextAreaElement>}
          aria-label={name}
          aria-invalid={errorMessage ? 'true' : 'false'}
          rows={4}
          disabled={disabled}
          placeholder={placeholder}
          invalid={invalid ? BooleanEnum.TRUE : BooleanEnum.FALSE}
          {...(register && {
            ...register(name, {
              required: required || false,
            }),
          })}
          defaultValue={defaultValue}
        />
      ) : (
        <StyledInput
          ref={placeNameRef as ForwardedRef<HTMLInputElement>}
          disabled={disabled}
          id={name}
          aria-label={name}
          aria-invalid={errorMessage ? 'true' : 'false'}
          type={type}
          placeholder={placeholder}
          invalid={invalid ? BooleanEnum.TRUE : BooleanEnum.FALSE}
          {...(register && {
            ...register(name, {
              required: required || false,
            }),
          })}
          defaultValue={defaultValue}
        />
      )}
      <AnimatePresence>
        {errorMessage && (
          <ErrorText
            as={motion.span}
            variants={errorTextVariants}
            initial="initial"
            animate="animation"
            exit="exit"
            margin={errorTextMargin as string}
          >
            {errorMessage}
          </ErrorText>
        )}
      </AnimatePresence>
    </StyledTextBox>
  );
};

const errorTextVariants: Variants = {
  initial: { x: -100, opacity: 0 },
  animation: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

export default Input;
