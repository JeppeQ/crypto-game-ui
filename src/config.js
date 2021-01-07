const hostname = window && window.location && window.location.hostname

let API_ENDPOINT = ''
if (hostname.indexOf('localhost') > -1) {
  API_ENDPOINT = 'http://localhost:8080/api'
}

export {
  API_ENDPOINT
}
