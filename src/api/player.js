import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/player`

export async function me(token) {
  const url = `${API_ROUTE}/me`
  const response = await axios.get(url, { headers: buildApiHeaders(token) }).catch(err => console.log(err))

  if (response && response.data) {
    return response.data
  }
}

export async function authenticate(signature, msgParams) {
  const url = `${API_ROUTE}/authenticate`
  const response = await axios.post(url, {
    signature,
    msgParams
  }).catch(err => console.log(err))

  if (response && response.data) {
    localStorage.setItem('jwtToken', response.data)
    return response.data
  }
}

export async function signup(token) {
  const url = `${API_ROUTE}/signup`
  const response = await axios.post(url, {}, {
    headers: buildApiHeaders(token)
  }).catch(err => console.log(err))

  if (response && response.data) {
    return response.data
  }
}