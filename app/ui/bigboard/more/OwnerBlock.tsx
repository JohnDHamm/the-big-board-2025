'use client';

import React from "react";
import { Container, Avatar, OwnerName } from './OwnerBlock.styles'

interface Props {
  name: string;
  imgUrl: string;
}

const OwnerBlock: React.FC<Props> = ({ name, imgUrl}) => {
  return (
    <Container>
      <Avatar 
        src={imgUrl}
        alt={name}
      />
      <OwnerName>{name}</OwnerName>
    </Container>
  );
}

export default OwnerBlock;
