import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/social`

export async function addEmail(email) {
  const url = `${API_ROUTE}/email`
  axios.post(url, { email }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))
}