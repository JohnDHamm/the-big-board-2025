import styled from 'styled-components';
import { COLORS, FONTS } from '@/app/styles';

const Box = styled.div`
  padding-left: 0.5rem;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const SelectBox = styled(Box)`
  border: 1px solid ${COLORS.SECONDARY_GRAY};
  background-color: ${COLORS.WHITE};
`;

export const SelectBoxText = styled.p<{ $hasSelection: boolean }>`
  font-family: ${(props) =>
    props.$hasSelection ? FONTS.NAMES : FONTS.BLOCKLETTER};
  font-size: 1.25rem;
  color: ${(props) =>
    props.$hasSelection ? COLORS.PRIMARY_GREEN : COLORS.DISABLED_GRAY};
`;

export const IconBlock = styled.div`
  width: 20px;
  padding-right: 0.5rem;
`;

export const OptionBox = styled(Box)`
  border: 1px solid ${COLORS.SECONDARY_GRAY};

  &:hover {
    border: 2px solid ${COLORS.PRIMARY_GREEN};
  }
`;
