import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/season`

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

export async function getSeason(seasonId) {
  const url = `${API_ROUTE}/previous`
  const response = await axios.get(url, {
    params: {
      seasonId
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

