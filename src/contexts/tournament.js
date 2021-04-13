import React, { createContext, useState, useEffect } from "react"
import { DateTime } from "luxon"

import * as tournamentApi from "../api/tournament"

export const TournamentContext = createContext()

export const TournamentProvider = ({ children }) => {
  const [info, setInfo] = useState({})
  const [players, setPlayers] = useState()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const getTournamentInfo = async () => {
      const tourney = await tournamentApi.getTournamentInfo()
      if (tourney) {
        setInfo(tourney)
        setTournamentActive(tourney)
      }
    }
  
    getTournamentInfo()
  }, [])

  const setTournamentActive = (tourney) => {
    const now = DateTime.utc()
    const start = DateTime.fromISO(tourney.start)
    const end = DateTime.fromISO(tourney.end)
    if (now > start && now < end) {
      setActive(true)
    }
  }

  return (
    <TournamentContext.Provider
      value={{
        info,
        players,
        setPlayers,
        active
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};