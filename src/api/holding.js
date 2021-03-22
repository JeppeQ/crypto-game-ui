import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/holding`

export async function getHoldings(address) {
  const url = `${API_ROUTE}/list`
  const response = await axios.get(url, {
    params: {
      address
    },
    headers: buildApiHeaders()
  }).catch(err => console.log(err))

  return response ? response.data : []
}