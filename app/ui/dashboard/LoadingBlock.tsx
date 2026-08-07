'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'
import getLeague from '@/app/api/Leagues/[id]/getLeague';
import getOverallRankings from '@/app/api/OverallRankings/[scoringType]/getOverallRankings';
import getOwners from '@/app/api/Owners/[id]/getOwners';
import getPicks from '@/app/api/Picks/[leagueId]/getPicks';
import getPlayers from '@/app/api/Players/getPlayers';
import getPositionRankings from '@/app/api/PositionRankings/[scoringType]/getPositionRankings';
import getTeams from '@/app/api/Teams/getTeams';

import {
  CurrentPickContext,
  DraftContext,
  DraftStatusContext,
  MyTeamContext,
  PicksContext,
  PlayersContext,
  TeamsContext,
  UserContext
} from '@/app/contexts';

import isEmpty from 'lodash.isempty';
import keyBy from 'lodash.keyby';
import find from 'lodash.find';
import concat from 'lodash.concat';
import { calcTotalRounds } from '@/app/utils';

const LoadingBlock = () => {
  const router = useRouter();

  //contexts
  const { setCurrentDraftPick } = useContext(CurrentPickContext);
  const { setCurrentDraft } = useContext(DraftContext);
  const { setCurrentDraftStatus } = useContext(DraftStatusContext);
  const { setCurrentMyTeam } = useContext(MyTeamContext);
  const { setCurrentPicks } = useContext(PicksContext);
  const { setCurrentPlayers } = useContext(PlayersContext);
  const { setCurrentTeams } = useContext(TeamsContext);
  const { user } = useContext(UserContext);

  //state
  const [league, setLeague] = useState<League>({
    _id: '',
    name: '',
    draftOrder: [],
    draftStatus: 'not started',
    positionSlots: [],
    scoringType: 'non-ppr',
  });
  const [owners, setOwners] = useState<Owner[]>([]);
  const [savedPlayers, setSavedPlayers] = useState<Player[]>([]);
  const [savedPicks, setSavedPicks] = useState<DraftPick[] | null>(null);
  const [savedPositionRankings, setSavedPositionRankings] = useState<
    SavedPositionRanking[]
  >([]);
  const [savedOverallRankings, setSavedOverallRankings] = useState<
    SavedOverallRanking[]
  >([]);
  const [teamsAreReady, setTeamsAreReady] = useState<boolean>(false);
  const [playersAreReady, setPlayersAreReady] = useState<boolean>(false);
  const [myTeamIsReady, setMyTeamIsReady] = useState<boolean>(false);
  const [picksAreReady, setPicksAreReady] = useState<boolean>(false);
  // const [goToBoard, setGoToBoard] = useState<boolean>(false);

  const createCompleteDraftOrder = (
    draftOrder: string[],
    totalPicks: number
  ): string[] => {
    const numRounds = totalPicks / draftOrder.length;
    const oddRoundOrder = draftOrder;
    const evenRoundOrder = Array.from(draftOrder).reverse();
    let completeOrder: string[] = [];
    for (let i = 1; i < numRounds + 1; i++) {
      if (i % 2 === 1) {
        completeOrder = concat(completeOrder, oddRoundOrder);
      } else {
        completeOrder = concat(completeOrder, evenRoundOrder);
      }
    }
    return completeOrder;
  };

  // set current players and my team
  useEffect(() => {
    if (
      user &&
      !isEmpty(savedPlayers) &&
      !isEmpty(savedPositionRankings) &&
      !isEmpty(savedOverallRankings) &&
      savedPicks &&
      setCurrentMyTeam &&
      setCurrentPlayers
    ) {
      //  init players
      const playersInfo: PlayerInfo[] = savedPlayers.map((player) => ({
        available: true,
        positionRank: null,
        overallRank: null,
        ...player,
      }));
      const formatPlayers: Players = keyBy(playersInfo, '_id');
      // update availability
      const selectedPlayers: DraftPick[] = [];
      for (const key in formatPlayers) {
        const matchPick = find(savedPicks, {
          playerId: formatPlayers[key]._id,
        });
        if (matchPick) {
          selectedPlayers.push(matchPick);
        }
      }
      selectedPlayers.forEach((player) => {
        formatPlayers[player.playerId].available = false;
      });
      // set my team
      const userPlayers = selectedPlayers.filter(
        (player) => player.ownerId === user?._id
      );
      setCurrentMyTeam(userPlayers);
      setTimeout(() => setMyTeamIsReady(true), 4000);
      // update rankings
      for (const key in formatPlayers) {
        const posRank = savedPositionRankings.filter(
          (ranking) => ranking.playerId === formatPlayers[key]._id
        );
        const overRank = savedOverallRankings.filter(
          (ranking) => ranking.playerId === formatPlayers[key]._id
        );
        if (!isEmpty(posRank)) {
          formatPlayers[key].positionRank = posRank[0].rank;
        }
        if (!isEmpty(overRank)) {
          formatPlayers[key].overallRank = overRank[0].rank;
        }
      }
      setCurrentPlayers(formatPlayers);
      setTimeout(() => {
        setPlayersAreReady(true);
      }, 2000);
    }
  }, [
    savedPlayers,
    savedPositionRankings,
    savedOverallRankings,
    savedPicks,
    user,
    setCurrentPlayers,
    setCurrentMyTeam,
  ]);

  // set current draft pick and current picks
  useEffect(() => {
    if (league._id.length > 0 && owners.length > 0 && savedPicks) {
      const newDraft: Draft = {
        league,
        owners,
      };
      setCurrentDraft(newDraft);
      if (!isEmpty(league.draftOrder) && league.draftStatus !== 'not started') {
        const numOwners = owners.length;
        const numRounds = calcTotalRounds(league.positionSlots);
        const totalPicks = numRounds * numOwners;
        const completeDraftOrder: string[] = createCompleteDraftOrder(
          league.draftOrder,
          totalPicks
        );
        const emptyPick: Pick<DraftPick, 'playerId'> = {
          playerId: '',
        };
        const emptyPicks: DraftPickContext = {};
        for (let i = 1; i < totalPicks + 1; i++) {
          emptyPicks[i] = {
            selectionNumber: i,
            ownerId: completeDraftOrder[i - 1],
            ...emptyPick,
          };
        }
        const picksContext: DraftPickContext = emptyPicks;
        const savedPicksContext: DraftPickContext = keyBy(
          savedPicks,
          'selectionNumber'
        );
        if (!isEmpty(savedPicksContext)) {
          for (const key in savedPicksContext) {
            picksContext[key] = savedPicksContext[key];
          }
        }
        const currentPick: CurrentDraftPick = {
          selectionNumber: 1,
          ownerId: '',
        };
        for (let i = 1; i < Object.keys(picksContext).length + 1; i++) {
          if (picksContext[i].playerId === '') {
            currentPick.selectionNumber = i;
            currentPick.ownerId = picksContext[i].ownerId;
            break;
          }
        }
        // console.log('currentPick', currentPick);
        setCurrentPicks(picksContext);
        setCurrentDraftPick(currentPick);
      }
      setTimeout(() => setPicksAreReady(true), 3000);
    }
  }, [
    league,
    owners,
    savedPicks,
    setCurrentDraftPick,
    setCurrentPicks,
    setCurrentDraft,
  ]);

  // get all rankings and picks
  useEffect(() => {
    if (league._id.length > 0) {
      const { scoringType } = league;
      getPositionRankings(scoringType)
        .then((posRanks: SavedPositionRanking[]) => {
          setSavedPositionRankings(posRanks);
        })
        .then(() => getOverallRankings(scoringType))
        .then((overRanks: SavedOverallRanking[]) => {
          setSavedOverallRankings(overRanks);
        })
        .then(() => getPicks(league._id))
        .then((leaguePicks: DraftPick[]) => {
          setSavedPicks(leaguePicks);
        })
        .catch((err) => console.log('err', err));
    }
  }, [league]);

  // get league and owners, set draft status
  useEffect(() => {
    console.log("user", user)
    if (user) {
      getLeague(user.leagueId)
        .then((userLeague: League) => {
          if (userLeague) {
            // console.log('userLeague', userLeague);
            setLeague(userLeague);
            setCurrentDraftStatus(userLeague.draftStatus);
          }
        })
        .then(() => getOwners(user.leagueId))
        .then((leagueOwners: Owner[]) => {
          if (leagueOwners.length > 0) {
            setOwners(leagueOwners);
          }
        })
        .catch((err) => console.log('err', err));
    }
  }, [user, setCurrentDraftStatus]);

  // get teams and players
  useEffect(() => {
    getTeams()
      .then(((teams: NFL_Team[]) => {
        // console.log("teams:", teams);
        if (!isEmpty(teams)) {
          const formatTeams: Teams = keyBy(teams, '_id');
          // console.log("formatTeams:", formatTeams);
          setCurrentTeams(formatTeams);
          setTimeout(() => {
            setTeamsAreReady(true);
          }, 1000);
        }
      }))
      .then(() => getPlayers())
      .then((leaguePlayers: Player[]) => {
        setSavedPlayers(leaguePlayers);
      })
      .catch((err) => console.log('err', err));
  }, [setCurrentTeams]);

  useEffect(()=> {
    // console.log('owners', owners);
  }, [owners])

  useEffect(() => {
    // console.log('savedPlayers', savedPlayers);
  }, [savedPlayers]);

  useEffect(() => {
    // console.log('savedPicks', savedPicks);
  }, [savedPicks])

  useEffect(() => {
    if (teamsAreReady && playersAreReady && picksAreReady && myTeamIsReady) {
      setTimeout(() => router.push('/bigboard/selections'), 1000);
    }
  }, [myTeamIsReady, playersAreReady, teamsAreReady, picksAreReady, router]);

  const getColor = (condition: boolean) => {
    return condition ? 'text-[#bada55]' : 'text-gray-300';
  }

  return (
    <div>
      <p>preparing draft data for</p>
      {league && <p className={`${getColor(true)}`}>{league.name}</p>}
      <div className="pt-2">
        <p className={`${getColor(teamsAreReady)}`}>NFL TEAMS</p>
        <p className={`${getColor(playersAreReady)}`}>NFL PLAYERS</p>
        {/* <p className={`${getColor(savedPositionRankings.length !== 0)}`}>POSITION RANKINGS</p> */}
        {/* <p className={`${getColor(savedOverallRankings.length !== 0)}`}>OVERALL RANKINGS</p> */}
        <p className={`${getColor(picksAreReady)}`}>DRAFT SETTINGS AND PICKS</p>
        <p className={`${getColor(myTeamIsReady)}`}>YOUR TEAM ROSTER</p>
      </div>
    </div>
  )
}

export default LoadingBlock;
