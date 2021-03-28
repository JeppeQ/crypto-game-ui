import React, { createContext, useState, useEffect } from "react"
import * as tournamentApi from "../api/tournament"

export const TournamentContext = createContext()

export const TournamentProvider = ({ children }) => {
  const [info, setInfo] = useState({})
  const [players, setPlayers] = useState()

  useEffect(() => {
    getTournamentInfo()
  }, [])

  const getTournamentInfo = async () => {
    const tourney = await tournamentApi.getTournamentInfo()
    if (tourney) {
      setInfo(tourney)
    }
  }

  return (
    <TournamentContext.Provider
      value={{
        info,
        players,
        setPlayers
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};