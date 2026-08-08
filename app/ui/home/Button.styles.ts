import styled from 'styled-components';
import { COLORS, FONTS } from '@/app/styles';

export const StyledButton = styled.button<{ $width?: string; $alternate: boolean, $disabled: boolean }>`
  padding: 0 2.5rem;
  background-color: ${(props) =>
    props.$disabled ? COLORS.DISABLED_GRAY :
    props.$alternate ? COLORS.WHITE : COLORS.PRIMARY_GREEN};
  border-radius: 100px;
  border-color: ${(props) =>
    props.$disabled ? COLORS.DISABLED_GRAY :
    props.$alternate ? COLORS.DISABLED_GRAY : COLORS.PRIMARY_GREEN};
  border-width: 1px;
  border-style: solid;
  width: ${(props) => (props.$width ? props.$width : 'auto')};
  color: ${(props) => (props.$alternate ? COLORS.DISABLED_GRAY : COLORS.WHITE)};
  font-family: ${FONTS.BLOCKLETTER};
  font-size: 1.5rem;

  &:hover {
    cursor: ${(props) => props.$disabled ? 'not-allowed' : 'pointer'};
    filter: ${(props) => props.$disabled ? null : 'brightness(0.95)'};
  }

  &:active {
    border-color: ${(props) => props.$disabled ? null : COLORS.SUCCESS};
  }
`;
