'use client';

import React, { useContext } from "react";

import { Container, CommishTitle, TitleBlock, ContentItem } from "./CommishCommands.styles";
import Button from "@/app/ui/home/Button";
import { UserContext } from "@/app/contexts";

import { socket } from "@/app/sockets/socket";

const CommishCommands: React.FC = () => {
  const { user }= useContext(UserContext);

  const startDraft = () => {
    console.log('startDraft');
    //TODO: 
    // // post new draft staus to League
    // on OK res => socket.emit("DraftStarted") w/message
    socket.emit('StartDraft', "Good luck to all!", user?.leagueId);
    
    //  socket.on("DraftStarted") => commish modal, update draft context
    //          modal onActionCall (prompt: "Let's GO!") => clear modals
  }

  const pauseDraft = () => {
    // post new draft staus to League
    // on OK res => socket.emit("PauseDraft") w/message
    socket.emit('PauseDraft', "Hold on a sec!", user?.leagueId);
    //  socket.on => commish modal (no action), update draft context
    // ??? ability for commish to clear modal to reopen?

  }

  const reopenDraft = () => {
    // post new draft staus to League
    // on OK res => socket.emit("DraftReopened") w/message
    socket.emit('ReopenDraft', "Let's get back to it!", user?.leagueId);
    //  socket.on => commish modal, update draft context
    //          modal onActionCall(prompt "Continue drafting") =>  clear modals, restart needed?
  }

  return (
    <Container>
      <TitleBlock>
        <CommishTitle>Commissioner Control</CommishTitle>
      </TitleBlock>
      <ContentItem>
        <Button onClick={() => startDraft()}>
          <p>open the draft</p>
        </Button>
      </ContentItem>
      <ContentItem>
        <Button onClick={() => pauseDraft()}>
          <p>pause the draft</p>
        </Button>
      </ContentItem>
      <ContentItem>
        <Button onClick={() => reopenDraft()}>
          <p>reopen the draft</p>
        </Button>
      </ContentItem>
    </Container>
  )
}

export default CommishCommands;
