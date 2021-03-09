import axios from 'axios'
import { API_ENDPOINT } from '../config'

const API_ROUTE = `${API_ENDPOINT}/player`

export async function signup(signature, address, msgParams) {
  const url = `${API_ROUTE}/signup`
  const response = await axios.post(url, {
    signature,
    address,
    msgParams
  }).catch(err => console.log(err))

  return response ? response.data : {}
}