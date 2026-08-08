import React from 'react';
import { StyledButton } from './Button.styles';

interface Props {
  alternate?: boolean;
  disabled?: boolean;
  onClick: () => void;
  width?: string;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
  alternate = false,
  children,
  disabled = false,
  onClick,
  width
}) => {
  return (
    <StyledButton
      $alternate={alternate}
      $disabled={disabled}
      onClick={disabled ? () => null : onClick}
      type='button'
      $width={width}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
