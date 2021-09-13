import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from '.'

const API_ROUTE = `${API_ENDPOINT}/user`

export async function getMe(token) {
  const url = `${API_ROUTE}/me`
  const response = await axios.get(url, { headers: buildApiHeaders(token) })
    .catch(err => err.response)

  return response ? response.data : null
}

export async function create(email, password) {
  const url = `${API_ROUTE}/create`
  const response = await axios.post(url, {
    email,
    password
  }).catch(err => err.response)

  return response ? response.data : {}
}

export async function createGoogle(googleObject) {
  const url = `${API_ROUTE}/createGoogle`
  const response = await axios.post(url, { idToken: googleObject.tokenId })
    .catch(err => err.response)

  return response ? response.data : {}
}

export async function login(email, password) {
  const url = `${API_ROUTE}/login`
  const response = await axios.post(url, {
    email,
    password
  }).catch(err => err.response)

  return response ? response.data : {}
}

export async function loginGoogle(googleObject) {
  const url = `${API_ROUTE}/loginGoogle`
  const response = await axios.post(url, { idToken: googleObject.tokenId })
    .catch(err => err.response)

  return response ? response.data : {}
}

export async function addName(name) {
  const url = `${API_ROUTE}/name`
  const response = await axios.post(url, {
    name
  }, { headers: buildApiHeaders() })
    .catch(err => err.response)

  return response ? response.data : null
}