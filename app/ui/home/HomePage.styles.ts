import styled from 'styled-components';
import { COLORS, FONTS, SCREEN_WIDTHS } from '@/app/styles';

export const Page = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  background-color: ${COLORS.PRIMARY_GREEN};
`;

export const TopBlock = styled.div`
  display: flex;
  flex: 0.15;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 480px;
  @media screen and (${SCREEN_WIDTHS.MOBILE}) {
    width: 300px;
  }
`;

export const Content = styled.div`
  width: 480px;
  flex: 0.85;
  @media screen and (${SCREEN_WIDTHS.MOBILE}) {
    width: 90%;
  }
`;

export const Title = styled.p`
  /* padding: 2rem 0 1.5rem 0; */
  font-family: ${FONTS.BLOCKLETTER};
  font-size: 2.5rem;
  color: ${COLORS.WHITE};
`;

export const IntroText = styled.p`
  font-family: ${FONTS.NAMES};
  font-size: 1.25rem;
  color: ${COLORS.BLACK};
`

export const ContentItem = styled.div`
  text-align: center;
  margin: 1.5rem 0;
`;

export const ButtonContainer = styled.div`
  margin: 4rem 1rem;
`

export const ErrorMsg = styled.p`
  margin: 0;
  padding-top: 1rem;
  font-family: ${FONTS.NAMES};
  font-size: 1.5rem;
  color: ${COLORS.ERR};
  text-align: center;
`;
