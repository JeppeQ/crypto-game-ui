import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/season`

export async function getCurrentSeason() {
  const url = `${API_ROUTE}`
  const response = await axios.get(url).catch(err => console.log(err))

  return response ? response.data : null
}

export async function me(seasonId) {
  const url = `${API_ROUTE}/me`
  const response = await axios.get(url, {
    params: {
      seasonId
    },
    headers: buildApiHeaders()
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getSeason(seasonId, orderBy, direction, page, search) {
  const url = `${API_ROUTE}/previous`
  const response = await axios.get(url, {
    params: {
      seasonId,
      orderBy,
      direction,
      page,
      search
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getTradeHistory(seasonId, playerId) {
  const url = `${API_ROUTE}/player/trades`
  const response = await axios.get(url, {
    params: {
      playerId,
      seasonId,
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

