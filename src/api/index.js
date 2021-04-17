export function buildApiHeaders(token = localStorage.getItem('jwtToken')) {
  return {
    Authorization: `Bearer ${token}`
  }
}

const hostname = window && window.location && window.location.hostname

let API_ENDPOINT = ''
let URL = ''
if (hostname.indexOf('localhost') > -1) {
  URL = 'http://localhost'
  API_ENDPOINT = 'http://localhost:8080/api'
} else {
  URL = 'https://cryptoseasons.app'
  API_ENDPOINT = 'https://backend-dot-crypto-investment-game.ew.r.appspot.com/api'
}

export {
  API_ENDPOINT,
  URL
}
