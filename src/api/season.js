import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/season`

export async function getCurrentSeason() {
  const url = `${API_ROUTE}`
  const response = await axios.get(url).catch(err => console.log(err))

  return response ? response.data : null
}

export async function join() {
  const url = `${API_ROUTE}/join`
  const response = await axios.post(url, {}, {
    headers: buildApiHeaders()
  }).catch(err => console.log(err))

  return response ? response.data : null
}