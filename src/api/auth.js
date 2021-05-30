import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/auth`

export async function googleAuth(googleObject) {
  const url = `${API_ROUTE}/google`
  const response = await axios.post(url, { idToken: googleObject.tokenId }).catch(err => console.log(err))

  if (response && response.data) {
    localStorage.setItem('jwtToken', response.data)
    return response.data
  }
}

export async function walletAuth(signature, msgParams) {
  const url = `${API_ROUTE}/wallet`
  const response = await axios.post(url, {
    signature,
    msgParams
  }).catch(err => console.log(err))

  if (response && response.data) {
    localStorage.setItem('jwtToken', response.data)
    return response.data
  }
}