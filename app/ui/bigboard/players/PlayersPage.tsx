'use client'

import React from 'react';
// import sortBy from 'lodash.sortby';
// import find from 'lodash.find';

import PlayerCard from "@/app/ui/bigboard/players/PlayerCard";
import ThreeUpLayout from "@/app/ui/bigboard/ThreeUpLayout";
import MobileContentContainer from "@/app/ui/bigboard/MobileContentContainer";
import { ContentPadding } from "@/app/ui/bigboard/players/PlayersPage.styles";
import PositionToggle from "@/app/ui/bigboard/players/PositionToggle";
import SortToggle from './SortToggle';
import HidePlayersToggle from './HidePlayersToggle';

import getPicks from '@/app/api/Picks/[leagueId]/getPicks';
// import makePick
// import updateDraftStatus from ''

import { CurrentPickContext, DraftContext, MyTeamContext, PlayersContext, TeamsContext, UserContext } from '@/app/contexts';
import HighestAvailablePlayers from './HighestAvailablePlayers';
import MyDraftNeeds from './MyDraftNeeds';

type Sorting = 'RANK' | 'A-Z' | 'TEAM';
const sortTypes: Sorting[] = ['RANK', 'A-Z', 'TEAM'];
const positions: NFL_Position[] = ['QB', 'RB', 'WR', 'TE', 'D', 'K'];
const LS_KEY = {
  PLAYERS_SETTINGS: 'player_settings',
};
const SETTINGS_KEYS = {
  SELECTED_POSITIONS: 'sel_positions',
  SORTING: 'sort',
  HIDE_SELECTED: 'hide_selected',
};

const PlayersPage: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const { currentDraftPick } = React.useContext(CurrentPickContext);
  const { draft } = React.useContext(DraftContext);
  const { players } = React.useContext(PlayersContext);
  const { teams } = React.useContext(TeamsContext);
  const { myTeam } = React.useContext(MyTeamContext);
  // const { setCurrentPickConfirmModal } = React.useContext(
  //   PickConfirmModalContext
  // );
  
  const [playersRenderList, setPlayersRenderList] = React.useState<
    PlayerInfo[]
  >([]);
  const [selectedPositions, setSelectedPositions] = React.useState<
    NFL_Position[]
  >([]);
  const [canMakePick, setCanMakePick] = React.useState<boolean>(false);
  const [overallPlayersList, setOverallPlayersList] = React.useState<
    HighestRankPlayer[]
  >([]);
  const [sorting, setSorting] = React.useState<Sorting | ''>('');
  const [hideSelected, setHideSelected] = React.useState<boolean>(false);
  const [myNeeds, setMyNeeds] = React.useState<PositionNeeds>();


  const hasOpenPositionSlot = (position: NFL_Position): boolean => {
    // const numSlots =
    //   find(draft.league.positionSlots, { position: position })?.total || 0;
    // const myPicks = myTeam.filter(
    //   (pick) => players[pick.playerId].position === position
    // ).length;
    // return myPicks < numSlots;
    return true; //testing UI
  };


  
  const handlePick = (playerId: string) => {
    if (user) {
      // check if current selection # is correct
      getPicks(user.leagueId).then((picks) => {
        if (currentDraftPick.selectionNumber === picks.length + 1) {
          console.log('current #', currentDraftPick.selectionNumber);
          const selPlayer = players[playerId];
          const playerName = `${selPlayer.firstName} ${selPlayer.lastName}`;
          const team = teams[selPlayer.teamId];
          // setCurrentPickConfirmModal({
          //   visible: true,
          //   player: {
          //     name: playerName,
          //     position: selPlayer.position,
          //   },
          //   team: {
          //     abbv: team.abbv,
          //     colors: team.colors,
          //   },
          //   onCancel: () =>
          //     setCurrentPickConfirmModal(PICKCONFIRM_MODAL_INITIAL_VALUE),
          //   onConfirm: () => handleConfirm(playerId),
          // });
        }
      });
    }
  };

  const renderPlayers = () => {
    return playersRenderList.map((player) => {
      if (!hideSelected || (hideSelected && player.available)) {
        return canMakePick &&
          hasOpenPositionSlot(player.position) &&
          player.available ? (
          <div key={player._id} onClick={() => handlePick(player._id)}>
            <PlayerCard
              player={player}
              team={teams[player.teamId]}
              rank={player.positionRank}
              selectable={true}
            />
          </div>
        ) : (
          <PlayerCard
            key={player._id}
            player={player}
            team={teams[player.teamId]}
            rank={player.positionRank}
            selectable={false}
          />
        );
      } else {
        return null;
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateLocalStorage = (key: string, value: any) => {
    if (localStorage.getItem(LS_KEY.PLAYERS_SETTINGS)) {
      const store = localStorage.getItem(LS_KEY.PLAYERS_SETTINGS);
      if (store) {
        const updateObj = JSON.parse(store);
        updateObj[key] = value;
        localStorage.setItem(
          LS_KEY.PLAYERS_SETTINGS,
          JSON.stringify(updateObj)
        );
      }
    }
  };


  const handlePositionChange = (newSelectedPositions: NFL_Position[]) => {
    setSelectedPositions(newSelectedPositions);
    updateLocalStorage(SETTINGS_KEYS.SELECTED_POSITIONS, newSelectedPositions);
  };

  const handleSortChange = (newSort: Sorting) => {
    setSorting(newSort);
    updateLocalStorage(SETTINGS_KEYS.SORTING, newSort);
  };

  const handleHideSelectedChange = () => {
    const newValue = !hideSelected;
    updateLocalStorage(SETTINGS_KEYS.HIDE_SELECTED, newValue);
    setHideSelected(newValue);
  };

  React.useEffect(() => {
    const needs: PositionNeeds = { QB: 0, RB: 0, WR: 0, TE: 0, D: 0, K: 0 };
    draft.league.positionSlots.forEach((slot) => {
      const myPosPicks = myTeam.filter(
        (player) => players[player.playerId].position === slot.position
      );
      needs[slot.position] = slot.total - myPosPicks.length;
    });
    setMyNeeds(needs);
  }, [players, myTeam, draft, setMyNeeds]);


  React.useEffect(() => {
    const availPlayers: PlayerInfo[] = [];
    for (const key in players) {
      if (players[key].available && players[key].overallRank) {
        availPlayers.push(players[key]);
      }
    }
    // const sortedPlayers = sortBy(availPlayers, ['overallRank']);
    const overallRankPlayers: HighestRankPlayer[] = [];

    // sortedPlayers.forEach((player: PlayerInfo) => {
    availPlayers.forEach((player: PlayerInfo) => { //test UI
      if (player.overallRank) {
        overallRankPlayers.push({
          name: `${player.firstName} ${player.lastName}`,
          rank: player.overallRank,
          teamAbbv: teams[player.teamId].abbv,
          position: player.position,
        });
      }
    });
    setOverallPlayersList(overallRankPlayers.slice(0, 100));
  }, [players, teams]);

  React.useEffect(() => {
    const list: PlayerInfo[] = [];
    for (const key in players) {
      selectedPositions.forEach((selPos) => {
        if (players[key].position === selPos) {
          list.push(players[key]);
        }
      });
    }

    // switch (sorting) {
    //   case 'A-Z':
    //     setPlayersRenderList(sortBy(list, ['lastName', 'firstName']));
    //     break;
    //   case 'RANK':
    //     setPlayersRenderList(
    //       sortBy(list, ['positionRank', 'lastName', 'firstName'])
    //     );
    //     break;
    //   case 'TEAM':
    //     setPlayersRenderList(sortBy(list, ['teamId', 'lastName', 'firstName']));
    //     break;
    // }
    setPlayersRenderList(list); //UI testing
  }, [players, selectedPositions, sorting]);

  React.useEffect(() => {
    console.log('players', players);
  }, [players])

  React.useEffect(() => {
    if (!localStorage.getItem(LS_KEY.PLAYERS_SETTINGS)) {
      setSelectedPositions(['QB']);
      setSorting('RANK');
      const updateObj = {
        [SETTINGS_KEYS.SELECTED_POSITIONS]: ['QB'],
        [SETTINGS_KEYS.SORTING]: 'RANK',
        [SETTINGS_KEYS.HIDE_SELECTED]: false,
      };
      localStorage.setItem(LS_KEY.PLAYERS_SETTINGS, JSON.stringify(updateObj));
    } else {
      const savedSettings = localStorage.getItem(LS_KEY.PLAYERS_SETTINGS);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSelectedPositions(parsedSettings[SETTINGS_KEYS.SELECTED_POSITIONS]);
        setSorting(parsedSettings[SETTINGS_KEYS.SORTING]);
        setHideSelected(parsedSettings[SETTINGS_KEYS.HIDE_SELECTED]);
      }
    }
  }, []);



  return (
    <ThreeUpLayout
      left={
        <ContentPadding>
          <HighestAvailablePlayers players={overallPlayersList} />
        </ContentPadding>
      }
      center={
        <MobileContentContainer>
          <PositionToggle
            positions={positions}
            selectedPositions={selectedPositions}
            onPositionsToggle={(newSelectedPositions) =>
              handlePositionChange(newSelectedPositions)
            }
          />
          <SortToggle
            sortTypes={sortTypes}
            selectedSortType={sorting}
            onSortToggle={(newSort) => handleSortChange(newSort as Sorting)}
          />
          <HidePlayersToggle
            active={hideSelected}
            onToggle={() => handleHideSelectedChange()}
          />
          <div>{players && renderPlayers()}</div>
        </MobileContentContainer>
      }
      right={
        <ContentPadding>
          {myNeeds && <MyDraftNeeds myPositionNeeds={myNeeds} />}
        </ContentPadding>
      }
    />
  );
}

export default PlayersPage;
