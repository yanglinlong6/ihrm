import Cookies from 'js-cookie'

const TokenKey = 'hrToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 31 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
