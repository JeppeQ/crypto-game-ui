import React, { createContext, useState, useEffect } from "react"
import { DateTime } from "luxon"

import * as seasonApi from "../api/season"
import * as playerApi from "../api/player"

export const SeasonContext = createContext()

export const SeasonProvider = ({ children }) => {
  const [info, setInfo] = useState({})
  const [players, setPlayers] = useState()
  const [active, setActive] = useState(false)

  const [playerInfo, setPlayerInfo] = useState({})
  const [playerHoldings, setPlayerHoldings] = useState([])
  const [playerAssetValue, setPlayerAssetValue] = useState(0)
  const [playerAssetsLoading, loadPlayerAssets] = useState(true)

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

  useEffect(() => {
    getPlayerInfo()
    
    const periodicFetch = setInterval(() => {
      getPlayerInfo()
    }, 60000)

    return () => clearInterval(periodicFetch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setSeasonActive = (tourney) => {
    const now = DateTime.utc()
    const start = DateTime.fromISO(tourney.start)
    const end = DateTime.fromISO(tourney.end)
    if (now > start && now < end) {
      setActive(true)
    }
  }

  const updatePlayer = async () => {
    loadPlayerAssets(true)
    getPlayerInfo()
  }

  const getPlayerInfo = async () => {
    const player = await playerApi.me()
    if (player) {
      setPlayerInfo({
        id: player.id,
        cash: player.cash,
        netWorth: player.netWorth,
        rank: player.rank
      })

      if (player.holdings) {
        setPlayerHoldings(player.holdings)
        setPlayerAssetValue(Math.round(player.holdings.reduce((a, b) => a + (b.value || 0), 0) * 100) / 100)
      }
    }
    loadPlayerAssets(false)
  }

  return (
    <SeasonContext.Provider
      value={{
        info,
        players,
        setPlayers,
        active,
        playerInfo,
        playerAssetsLoading,
        playerHoldings,
        playerAssetValue,
        updatePlayer
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
};