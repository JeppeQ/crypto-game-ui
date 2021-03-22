import axios from 'axios'
import { API_ENDPOINT } from '../config'

const API_ROUTE = `${API_ENDPOINT}/leaderboard`

export async function getLeaderboard(orderBy, direction, page, search) {
  const url = `${API_ROUTE}`
  const response = await axios.get(url, {
    params: {
      orderBy,
      direction,
      page,
      search
    }
  }).catch(err => console.log(err))

  return response ? response.data : { rows: [], count: 0 }
}

export async function updateLeaderBoard() {
  const url = `${API_ROUTE}/update`
  await axios.post(url)
}