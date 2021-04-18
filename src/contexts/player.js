import React, { createContext, useState, useEffect } from "react"
import ReactGA from 'react-ga'

import { SignedUpDialog } from '../components/dialogs/signedUpDialog'
import { TradeLimitDialog } from '../components/dialogs/tradeLimitDialog'
import * as playerApi from '../api/player'
import * as holdingApi from '../api/holding'

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [info, setInfo] = useState({ cash: 0, rank: 0 })
  const [holdings, setHoldings] = useState([])
  const [assetValue, setAssetValue] = useState(0)
  const [assetsLoading, loadAssets] = useState(true)
  const [emailDialog, showEmailDialog] = useState(false)
  const [tradeLimitDialog, showTradeLimitDialog] = useState(false)

  useEffect(() => {
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const periodicFetch = setInterval(() => {
      getHoldings()
    }, 60000)

    return () => clearInterval(periodicFetch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const update = () => {
    loadAssets(true)
    getPlayerInfo()
    getHoldings()
  }

  const getPlayerInfo = async (jwt) => {
    const player = await playerApi.me(jwt)
    if (player) {
      setInfo({ ...info, ...player })
      ReactGA.set({ userId: player.address })
    }
  }

  const getHoldings = async () => {
    const holdings = await holdingApi.me()
    if (holdings) {
      setHoldings(holdings)
      setAssetValue(Math.round(holdings.reduce((a, b) => a + (b.value || 0), 0) * 100) / 100)
    }
    loadAssets(false)
  }

  const signup = async (jwt) => {
    const player = await playerApi.signup(jwt)
    if (player) {
      setInfo(player)
      showEmailDialog(true)

      ReactGA.event({
        category: 'User',
        action: 'Signed up'
      })
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        info,
        holdings,
        assetValue,
        signup,
        update,
        getPlayerInfo,
        assetsLoading,
        showTradeLimitDialog
      }}
    >
      {children}
      <SignedUpDialog open={emailDialog} close={() => showEmailDialog(false)} />
      <TradeLimitDialog open={tradeLimitDialog} close={() => showTradeLimitDialog(false)} />
    </PlayerContext.Provider>
  );
};