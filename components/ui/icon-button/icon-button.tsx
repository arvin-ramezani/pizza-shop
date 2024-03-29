import { motion, Variants } from 'framer-motion';
import React, { FC, ReactNode, CSSProperties, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties | undefined;
  wrapperStyles?: CSSProperties | undefined;
  tapEffect?: boolean;
  toastBtn?: boolean;
  boxShadow?: boolean;
  id?: string;
}

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

const iconButtonVariants: Variants = {
  tap: { scale: 0.6, opacity: 0.6 },
  hover: { scale: 1.1 },
  disabled: { opacity: 0.4, transition: { duration: 0.3 } },
  animation: { opacity: 1, cursor: 'pointer' },
};

const IconButton: FC<IconButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  className,
  disabled,
  style,
  tapEffect,
  toastBtn,
  boxShadow,
  wrapperStyles,
  id,
}) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    !toastBtn && e.stopPropagation();
    if (disabled) return;

    onClick && onClick(e);
  };

  return (
    <StyledIconButton
      onClick={onClickHandler}
      style={wrapperStyles}
      id={id && id}
    >
      <StyledButton
        className={className}
        as={motion.button}
        type="button"
        variants={iconButtonVariants}
        aria-label={ariaLabel}
        whileTap={tapEffect && !disabled ? 'tap' : undefined}
        whileHover={tapEffect && !disabled ? 'hover' : undefined}
        disabled={disabled}
        animate={disabled ? 'disabled' : 'animation'}
        style={style}
        boxshadow={boxShadow ? BooleanEnum.TRUE : BooleanEnum.FALSE}
      >
        {children}
      </StyledButton>
    </StyledIconButton>
  );
};

const StyledIconButton = styled.div`
  cursor: pointer;
  font-family: 'Vazir';
  display: inline-block;
`;

const StyledButton = styled(motion.button)<{ boxshadow?: BooleanEnum }>`
  background: transparent !important;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-family: 'Vazir';
  color: white;
  line-height: 0;

  & svg {
    filter: ${({ boxshadow }) =>
      boxshadow === BooleanEnum.TRUE
        ? 'drop-shadow( 0px 0px 2px #ffffff)'
        : 'none'};
  }

  &:focus {
    outline: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    transition: outline 0.8s;
  }
`;

export default IconButton;
