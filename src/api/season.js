import axios from 'axios'
import { API_ENDPOINT } from '.'

const API_ROUTE = `${API_ENDPOINT}/season`

export async function getSeasonInfo() {
  const url = `${API_ROUTE}`
  const response = await axios.get(url).catch(err => console.log(err))

  return response ? response.data : null
}