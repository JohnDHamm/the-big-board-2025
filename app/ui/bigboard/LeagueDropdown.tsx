'use client';

import { useEffect, useState } from "react";

const LeagueDropdown = () => {
  const [leaguesList, setLeaguesList] = useState<LeagueListItem[]>([]);

  const getLeaguesList = async() => { 
    const contentType = "application/json";

    if (process.env.NODE_ENV === 'production') {
      console.log('NODE_ENV is set to production.');
    } else {
      console.log('NODE_ENV is not set to production. Current value:', process.env.NODE_ENV);
    }

    try {
      const res = await fetch(`/api/Leagues`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get leagues', error);
    }
  }

  const initLeagues = async () => {
    const { leaguesList } = await getLeaguesList();
    console.log("leaguesList", leaguesList);
    if (leaguesList) {
      setLeaguesList(leaguesList);
    }
  }

  const getSelectOptions = (): string[] => {
    const options: string[] = [];
    leaguesList.forEach((league: LeagueListItem) => {
        options.push(league.name);
      });
    return options;
  };

  // const handleSelect = (option: string) => {
  //   console.log("option: ", option);
  // }

  const renderOptions = () => {
    return getSelectOptions().map((option) => (
        <option key={option} value={option}>{option}</option>
      ));
  };

  useEffect(() => {
    initLeagues();
  }, []);

  return (
    <div>
      <label>choose league:</label>
          {/* {leaguesList && leaguesList.map(league => (
            <p key={league.name}>{league.name}</p>
          ))
        } */}
      <select name="leagues" id="league-select">
        {leaguesList && renderOptions()}
      </select>
    </div>
  )
}

export default LeagueDropdown;
