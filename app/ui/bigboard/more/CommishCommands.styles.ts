import styled from 'styled-components';
import { COLORS, FONTS } from '@/app/styles';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border: 2px solid ${COLORS.PRIMARY_GREEN};
  border-radius: 10px;;
  `;

export const TitleBlock = styled.div`
  width: 100%;
  background-color: ${COLORS.BLACK};
  border-radius: 10px 10px 0 0;
  text-align: center;
`

export const CommishTitle = styled.p`
  font-family: ${FONTS.BLOCKLETTER};
  font-size: 2rem;
  color: ${COLORS.WHITE};
`

export const ContentItem = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`