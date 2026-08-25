'use client';

import React, { useContext } from "react";

import { Container, CommishTitle, TitleBlock, ContentItem } from "./CommishCommands.styles";
import Button from "@/app/ui/home/Button";
import { UserContext, DraftStatusContext } from "@/app/contexts";

import { socket } from "@/app/sockets/socket";
import updateDraftStatus from "@/app/api/Leagues/[id]/updateDraftStatus";

const CommishCommands: React.FC = () => {
  const { user }= useContext(UserContext);
  const { draftStatus } = useContext(DraftStatusContext);

  const startDraft = () => {
    if (user) {
      updateDraftStatus(user.leagueId, 'open')
      .then(() => {
        socket.emit('StartDraft', "Good luck to all!", user.leagueId);
      })
      .catch((err) => console.log('err', err));
    }
  }

  const pauseDraft = () => {
    if (user) {
      updateDraftStatus(user.leagueId, 'paused')
      .then(() => {
        socket.emit('PauseDraft', "Hold on a sec!", user.leagueId);
      })
      .catch((err) => console.log('err', err));
    }
  }

  const reopenDraft = () => {
    if (user) {
      updateDraftStatus(user.leagueId, 'open')
      .then(() => {
        socket.emit('ReopenDraft', "Let's get back to it!", user.leagueId);
      })
      .catch((err) => console.log('err', err));
    }
  }

  return (
    <Container>
      <TitleBlock>
        <CommishTitle>Commissioner Control</CommishTitle>
      </TitleBlock>
      <ContentItem>
        <Button disabled={draftStatus !== "not started"} onClick={() => startDraft()}>
          <p>open the draft</p>
        </Button>
      </ContentItem>
      <ContentItem>
        <Button disabled={draftStatus !== "open"} onClick={() => pauseDraft()}>
          <p>pause the draft</p>
        </Button>
      </ContentItem>
      <ContentItem>
        <Button disabled={draftStatus !== "paused"} onClick={() => reopenDraft()}>
          <p>reopen the draft</p>
        </Button>
      </ContentItem>
    </Container>
  )
}

export default CommishCommands;
