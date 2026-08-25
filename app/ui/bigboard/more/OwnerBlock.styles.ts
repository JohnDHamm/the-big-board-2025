import styled from 'styled-components';
import { COLORS, FONTS } from '@/app/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${COLORS.DISABLED_GRAY};
`;

export const OwnerName = styled.p`
  font-family: ${FONTS.NAMES};
  font-size: 1.5rem;
  padding-left: 1rem;;
`;
