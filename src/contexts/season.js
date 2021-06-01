import React, { createContext, useState, useEffect } from "react"
import { DateTime } from "luxon"

import * as seasonApi from "../api/season"

export const SeasonContext = createContext()

export const SeasonProvider = ({ children }) => {
  const [info, setInfo] = useState({})
  const [players, setPlayers] = useState()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const getSeasonInfo = async () => {
      const tourney = await seasonApi.getCurrentSeason()
      if (tourney) {
        setInfo(tourney)
        setSeasonActive(tourney)
      }
    }
  
    getSeasonInfo()
  }, [])

  const setSeasonActive = (tourney) => {
    const now = DateTime.utc()
    const start = DateTime.fromISO(tourney.start)
    const end = DateTime.fromISO(tourney.end)
    if (now > start && now < end) {
      setActive(true)
    }
  }

  return (
    <SeasonContext.Provider
      value={{
        info,
        players,
        setPlayers,
        active
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
};