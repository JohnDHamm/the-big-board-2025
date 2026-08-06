import React from 'react';
import { Container } from './MobileContentContainer.styles';

interface Props {
  children: React.ReactNode;
}

const MobileContentContainer: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default MobileContentContainer;
