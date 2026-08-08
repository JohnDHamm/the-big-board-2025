'use client';

import React, { JSX } from 'react';
import {
  BtnBlock,
  Content,
  ContentItem,
  ErrorMsg,
  LoadingMsg,
  LogoContainer,
  Page,
  SignIn,
  TopBlock,
} from './HomePage.styles';

import Logo from '../bigboard/Logo';
import Select from './Select';
import Input from './Input';
import Button from './Button';

import { UserContext } from '../../contexts';
// import { login } from '../../api';
import getLeaguesList from '@/app/api/Leagues/getLeaguesList';
// import { socket } from '../../sockets/SocketListener/SocketListener';
import { socket } from "@/app/sockets/socket";
import isEmpty from 'lodash.isempty';
import { LOCAL_STORAGE, TEST_LEAGUE_IDS } from '@/app/utils/constants';
import { useRouter } from 'next/navigation';

import { MOCK_USER } from '@/app/mock_data';

const HomePage: React.FC = () => {
  const { user, setCurrentUser } = React.useContext(UserContext);
  // const history = useHistory();
  const router = useRouter();

  const [leagues, setLeagues] = React.useState<LeagueListItem[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = React.useState<string>('');
  const [showNameInput, setShowNameInput] = React.useState<boolean>(false);
  const [showPasswordInput, setShowPasswordInput] =
    React.useState<boolean>(false);
  const [showLoginBtn, setShowLoginBtn] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const initLeagues = async () => {
    const leaguesList = await getLeaguesList();
    if (leaguesList) {
      setLeagues(leaguesList);
    }
  };

  const getSelectOptions = (): string[] => {
    const options: string[] = [];
    const filteredLeagues: LeagueListItem[] = leagues.filter(
      (league) => !TEST_LEAGUE_IDS.includes(league._id)
    );
    if (process.env.NODE_ENV !== 'development') {
      filteredLeagues.forEach((league: LeagueListItem) => {
        options.push(league.name);
      });
    } else {
      leagues.forEach((league: LeagueListItem) => {
        options.push(league.name);
      });
    }
    return options;
  };

  const handleSelectChange = (option: string) => {
    const league = leagues.filter((league) => league.name === option);
    setSelectedLeagueId(league[0]._id);
    setShowNameInput(true);
  };

  const renderSelect = (): JSX.Element => {
    return (
      <Select
        onSelect={(option) => handleSelectChange(option)}
        options={getSelectOptions()}
      />
    );
  };

  const userLogin = async () => {
    if (selectedLeagueId) {
      const newUser: UserLogin = {
        name,
        password,
        leagueId: selectedLeagueId,
      };
      // try {
      //   const loggedInUser: User = await login(newUser);
      //   if (loggedInUser) {
      //     localStorage.setItem(
      //       LOCAL_STORAGE.JWT_TOKEN,
      //       loggedInUser.accessToken
      //     );
      //     setCurrentUser(loggedInUser);
      //     socket.emit('JoinRoom', loggedInUser.leagueId);
      //     history.push(ROUTES.APP);
            // router.push('/bigboard')
      //   }
      // } catch (err) {
      //   setErrorMsg(err.message);
      // }
      setCurrentUser(MOCK_USER);
          socket.emit('JoinRoom', "mock league id");
          socket.emit('Hello', "mock league id");
          router.push('/bigboard')
    }
  };

  React.useEffect(() => {
    // console.log('user', user);
  }, [user]);

  React.useEffect(() => {
    // console.log('name', name);
    setShowPasswordInput(name.length > 0);
  }, [name]);

  React.useEffect(() => {
    setShowLoginBtn(password.length > 0);
  }, [password]);

  React.useEffect(() => {
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
        <SignIn>SIGN IN</SignIn>
        {isEmpty(leagues) ? (
          <LoadingMsg>Loading leagues...</LoadingMsg>
        ) : (
          <ContentItem>{renderSelect()}</ContentItem>
        )}
        {showNameInput && (
          <ContentItem>
            <Input
              type="text"
              placeholder="Name"
              onTextChange={(text) => setName(text)}
            />
          </ContentItem>
        )}
        {showPasswordInput && (
          <ContentItem>
            <Input
              type="password"
              placeholder="Password"
              onTextChange={(text) => setPassword(text)}
            />
          </ContentItem>
        )}
        {showLoginBtn && (
          <BtnBlock>
            <Button onClick={() => userLogin()}>sign in</Button>
          </BtnBlock>
        )}
        {!isEmpty(errorMsg) && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Content>
    </Page>
  );
};

export default HomePage;
