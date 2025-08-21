'use client';

import { useEffect, useState } from "react";
import getLeaguesList from "@/app/api/Leagues/getLeaguesList";

const LeagueDropdown = () => {
  const [leaguesList, setLeaguesList] = useState<LeagueListItem[]>([]);

  const initLeagues = async () => {
    const leaguesList: LeagueListItem[] = await getLeaguesList();
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
      {leaguesList.length ? (
        <div>
          <label>choose league:</label>
          <select name="leagues" id="league-select">
            {renderOptions()}
          </select>
        </div>
      ) : (
        <div>
          <p>loading leagues...</p>
        </div>
      )}
    </div>
  )
}

export default LeagueDropdown;
