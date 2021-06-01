import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/trade`

export async function buyToken(tokenId, value) {
  const url = `${API_ROUTE}/buy`
  const response = await axios.post(url, { tokenId, value }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))

  return response ? response.status : null
}

export async function sellToken(tokenId, amount) {
  const url = `${API_ROUTE}/sell`
  const response = await axios.post(url, { tokenId, amount }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))

  return response ? response.status : null
}

export async function getTradeHistory(playerId) {
  const url = `${API_ROUTE}/history`
  const response = await axios.get(url, {
    params: {
      playerId
    }
  }).catch(err => console.log(err))

  return response ? response.data : []
}