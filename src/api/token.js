import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/token`

export async function getMarket(orderBy, direction, page, search) {
  const url = `${API_ROUTE}/list`
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