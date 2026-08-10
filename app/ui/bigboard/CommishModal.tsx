'use client';

import React, { useContext } from 'react';
import {
  ActionWrapper,
  Container,
  Message,
  Status,
  Title,
  TitleText,
} from './CommishModal.styles';
import Button from '../home/Button';
import { CommishModalContext } from '@/app/contexts';
import { COMMISH_MODAL_INITIAL_VALUE } from '@/app/contexts/CommishModalContext/CommishModalContext';

const CommishModal: React.FC<CommishModal> = ({
  visible,
  status,
  message,
  hasAction,
  onActionCall,
  actionPrompt = '',
  dismissable,
}) => {
  const { setCurrentCommishModal } = useContext(CommishModalContext)

  return visible ? (
    <Container onClick={(e) => e.stopPropagation()}>
      <Title>
        <TitleText>A MESSAGE FROM THE COMMISH...</TitleText>
      </Title>
      <Status>{status}</Status>
      <Message>{message}</Message>
      { hasAction && onActionCall &&
        <ActionWrapper>
          <Button onClick={onActionCall}>{actionPrompt}</Button>
        </ActionWrapper>
      }
      { dismissable &&
        <ActionWrapper>
          <Button alternate onClick={() => setCurrentCommishModal(COMMISH_MODAL_INITIAL_VALUE)}>CLOSE</Button>
        </ActionWrapper>
      }
    </Container>
  ) : null;
};

export default CommishModal;
