'use client'

import React from 'react';
import {
  Container,
  Current,
  OnClockBlock,
  OnClockText,
  Name,
  TickerBlock,
} from './BottomTicker.styles';

interface Props {
  userHasCurrentPick?: boolean;
  ownerOnClockName?: string;
  ticker?: string;
}

const BottomTicker: React.FC<Props> = ({
  userHasCurrentPick = false,
  ownerOnClockName = '--',
  ticker = 'some ticker text',
}) => {
  return (
    <Container>
      <OnClockBlock $userHasCurrentPick={userHasCurrentPick}>
        {userHasCurrentPick ? (
          <Current>YOU ARE ON THE CLOCK</Current>
        ) : (
          <>
            <OnClockText>ON THE CLOCK:</OnClockText>
            <Name>{ownerOnClockName}</Name>
          </>
        )}
      </OnClockBlock>
      <TickerBlock>{ticker}</TickerBlock>
    </Container>
  );
};

export default BottomTicker;
