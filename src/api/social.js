import axios from 'axios'
import { API_ENDPOINT, buildApiHeaders } from './'

const API_ROUTE = `${API_ENDPOINT}/social`

export async function addEmail(email) {
  const url = `${API_ROUTE}/email`
  axios.post(url, { email }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))
}

export async function addWallet(wallet) {
  const url = `${API_ROUTE}/wallet`
  await axios.post(url, { wallet }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))
}

export async function addTwitter(twitter) {
  const url = `${API_ROUTE}/twitter`
  await axios.post(url, { twitter }, { headers: buildApiHeaders() })
    .catch(err => console.log(err))
}