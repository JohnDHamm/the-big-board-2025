import styled from 'styled-components';
import { FONTS } from '@/app/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const Avatar = styled.img<{ $imgUrl: string, $alt: string }>`
  src: ${(props) => props.$imgUrl};
  alt: ${(props) => props.$alt};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* border: 1px solid red; */
`;

export const OwnerName = styled.p`
  font-family: ${FONTS.NAMES};
  font-size: 1.5rem;
  padding-left: 1rem;;
`;
