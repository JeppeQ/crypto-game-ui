import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/holding`

export async function me() {
  const url = `${API_ROUTE}/me`
  const response = await axios.get(url, {
    headers: buildApiHeaders()
  }).catch(err => console.log(err))

  return response ? response.data : []
}

export async function getHoldings(playerId) {
  const url = `${API_ROUTE}/list`
  const response = await axios.get(url, {
    params: {
      playerId
    }
  }).catch(err => console.log(err))

  return response ? response.data : []
}