import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/tournament`

export async function getTournamentInfo() {
  const url = `${API_ROUTE}`
  const response = await axios.get(url).catch(err => console.log(err))

  return response ? response.data : null
}