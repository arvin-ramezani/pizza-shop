import React, { FC, ForwardedRef, MutableRefObject, useRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Property } from '@/node_modules/csstype/index';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion';

import {
  ErrorText,
  StyledInput,
  StyledLabel,
  StyledTextarea,
  StyledTextBox,
} from '@/styles/components/input.styled';
import { errorTextVariants } from './input.variants';

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

export default Input;
