'use client';

import React, { JSX, useCallback, useContext, useEffect, useState } from 'react';
import { socket } from "@/app/sockets/socket";
import isEmpty from 'lodash.isempty';
import { useRouter } from 'next/navigation';
import { Show, SignInButton, UserButton, useUser, useAuth } from '@clerk/nextjs'

import {
  ButtonContainer,
  Content,
  ContentItem,
  ErrorMsg,
  IntroText,
  LogoContainer,
  Page,
  Title,
  TopBlock,
} from './HomePage.styles';

import Logo from '../bigboard/Logo';
import Select from './Select';
import Button from './Button';

import { UserContext } from '../../contexts';
import getLeaguesList from '@/app/api/Leagues/getLeaguesList';
import getOwnerId from '@/app/api/Owners/userId/[userId]/getOwnerId';

const HomePage: React.FC = () => {
  const { setCurrentUser } = useContext(UserContext);
  const router = useRouter();
  const { user } = useUser();
  const { userId, orgId, orgRole } = useAuth();


  const [allLeagues, setAllLeagues] = useState<LeagueListItem[]>([]);
  const [userLeagues, setUserLeagues] = useState<LeagueListItem[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('');
  const [ownerId, setOwnerId] = useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  
  const initLeagues = async () => {
    const AllLeaguesList: LeagueListItem[] = await getLeaguesList();
    if (AllLeaguesList) {
      setAllLeagues(AllLeaguesList);
    }
  };

  interface OwnerIdResponse {
    _id: string;
  }

  const getIdFromUserId = useCallback(async () => {
    if (userId) {
      const res: OwnerIdResponse = await getOwnerId(userId);
      if (res && res._id) {
        setOwnerId(res._id);
      } else {
        setErrorMsg("Your account is being reviewed and processed. Please take the time to edit your username or avatar by clicking the icon above. Your league commissioner will let you know when you are approved and can sign into the draft.")
      }
    }
  }, [userId]);

  const getSelectOptions = (): string[] => {
    const options: string[] = [];
      userLeagues.forEach((league: LeagueListItem) => {
        options.push(league.name);
      });
    return options;
  };

  const handleSelectChange = (option: string) => {
    const league = userLeagues.filter((league) => league.name === option);
    setSelectedLeagueId(league[0]._id);
  };

  const renderSelect = (): JSX.Element => {
    return (
      <Select
        onSelect={(option) => handleSelectChange(option)}
        options={getSelectOptions()}
      />
    );
  };

  const confirmLeague = () => {
    if (userId && user && user.username && orgId) {
      const signedInUser: User = {
        _id: ownerId,
        userId: userId,
        name: user.username,
        leagueId: selectedLeagueId,
        isCommish: orgRole === "org:commissioner",
      }
      setCurrentUser(signedInUser);
      socket.emit('JoinRoom', signedInUser.leagueId);
      socket.emit('Hello', signedInUser.name, signedInUser.leagueId);
      router.push('/bigboard')
    }
  };

  // TODO:
  // currently manually adding user into db with clerk userId for dev testing
  // after sign in => check if user exists in Owner db, add?

  // get signed in user's organizations (leagues)
  useEffect(() => {
    if (user && !isEmpty(allLeagues)) {
      const userLeaguesList: LeagueListItem[] = [];
      user.organizationMemberships.forEach((org) => {
        //working on condition that for now each owner in the db has only one leagueId assigned
        const league = allLeagues.find((league) => league.orgId === org.organization.id)
        if (league) {
          userLeaguesList.push(league);
        }
      })
      setUserLeagues(userLeaguesList);
    }
  }, [user, allLeagues])

  useEffect(() => {
    if (userId) {
      getIdFromUserId();
    }
  }, [getIdFromUserId, userId])

  useEffect(() => {
    initLeagues();
  }, []);
  
  return (
    <Page>
      <TopBlock>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </TopBlock>
      <Content>
        <Show when="signed-out">
          <ContentItem>
            <Title>Welcome</Title>
            <IntroText>{`The best draft app in the world is currently only available to members with invitations. Please check your email for a sign up link if you have been invited by your league's commissioner.`}</IntroText>
            <ButtonContainer>
              <SignInButton >
                <Button alternate onClick={() => null}>Sign In</Button>
              </SignInButton>
            </ButtonContainer>
          </ContentItem>
        </Show>
        <Show when="signed-in">
          <ContentItem>
            <IntroText>Welcome back, </IntroText>
            <Title>{user?.username}</Title>
            <UserButton />
            {!isEmpty(errorMsg) ? (
              <ErrorMsg>{errorMsg}</ErrorMsg>
            ) : (
              <ContentItem>
                <IntroText>Please select your league below:</IntroText>
                <ContentItem>{renderSelect()}</ContentItem>
                {ownerId && selectedLeagueId && (
                  <ButtonContainer>
                    <Button alternate onClick={() => confirmLeague()}>{`Let's Go!`}</Button>
                  </ButtonContainer>
                )}
              </ContentItem>
            )}
          </ContentItem>
        </Show>
      </Content>
    </Page>
  );
};

export default HomePage;
