import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/player`

export async function me(token) {
  const url = `${API_ROUTE}/me`
  const response = await axios.get(url, { headers: buildApiHeaders(token) }).catch(err => console.log(err))

  if (response && response.data) {
    return response.data
  }
}

export async function getPlayer(playerId) {
  const url = `${API_ROUTE}`
  const response = await axios.get(url, {
    params: {
      playerId
    }
  }).catch(err => console.log(err))

  if (response && response.data) {
    return response.data
  }
}