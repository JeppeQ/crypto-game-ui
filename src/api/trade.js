import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/trade`

export async function buyToken(tokenId, value) {
  const url = `${API_ROUTE}/buy`
  const response = await axios.post(url, { tokenId, value }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))

  return response ? response.data : null
}

export async function sellToken(tokenId, amount) {
  const url = `${API_ROUTE}/sell`
  const response = await axios.post(url, { tokenId, amount }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))

  return response ? response.data : null
}