'use client';

import { useState, useEffect, useContext } from 'react';
import getLeague from '@/app/api/Leagues/[id]/getLeague';
import getOwners from '@/app/api/Owners/[id]/getOwners';
import getPlayers from '@/app/api/Players/getPlayers';
import getTeams from '@/app/api/Teams/getTeams';

import {
  DraftStatusContext,
  TeamsContext,
  UserContext
} from '@/app/contexts';

import isEmpty from 'lodash.isempty';
import keyBy from 'lodash.keyby';
// import find from 'lodash.find';
// import concat from 'lodash.concat';

const LoadingBlock = () => {
  //contexts
  const { setCurrentDraftStatus } = useContext(DraftStatusContext);
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
  const [teamsAreReady, setTeamsAreReady] = useState<boolean>(false);


  // get league and owners, set draft status
  useEffect(() => {
    console.log("user", user)
    if (user) {
      getLeague(user.leagueId)
        .then((userLeague: League) => {
          if (userLeague) {
            console.log('userLeague', userLeague);
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
        console.log("teams:", teams);
        if (!isEmpty(teams)) {
          const formatTeams: Teams = keyBy(teams, '_id');
          console.log("formatTeams:", formatTeams);
          setCurrentTeams(formatTeams);
          setTimeout(() => {
            setTeamsAreReady(true);
          }, 500);
        }
      }))
      .then(() => getPlayers())
      .then((leaguePlayers: Player[]) => {
        setSavedPlayers(leaguePlayers);
      })
      .catch((err) => console.log('err', err));
  }, [setCurrentTeams]);

  useEffect(()=> {
    console.log('owners', owners);
  }, [owners])

  useEffect(() => {
    console.log('savedPlayers', savedPlayers);
  }, [savedPlayers]);

  const getColor = (condition: boolean) => {
    return condition ? 'text-[#bada55]' : 'text-gray-300';
  }

  return (
    <div>
      <p>preparing draft data for</p>
      <p className={`${getColor(league.name.length !== 0)}`}>getting league...</p>
      {league && <p className="text-[#bada55]">{league.name}</p>}
      <p className={`${getColor(teamsAreReady)}`}>NFL TEAMS</p>
    </div>
  )

}

export default LoadingBlock;
