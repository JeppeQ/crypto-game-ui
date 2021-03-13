import React, { createContext, useState, useEffect } from "react"

import * as playerApi from '../api/player'


export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [info, setInfo] = useState({})

  useEffect(() => {
    getPlayerInfo()
  }, [])

  const getPlayerInfo = async (jwt) => {
    const player = await playerApi.me(jwt)
    if (player) {
      setInfo(player)
    }
  }

  const signup = async (jwt) => {
    const player = await playerApi.signup(jwt)
    if (player) {
      setInfo(player)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        info,
        signup,
        getPlayerInfo
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};