import { decodeCredential } from 'vue3-google-login'
export const getUserName = () => {
  if (localStorage.token) {
    const userData = decodeCredential(localStorage.token)
    return userData.given_name
  }
  return ''
}

export const getUserEmail = () => {
  if (localStorage.token) {
    const userData = decodeCredential(localStorage.token)
    return userData.email
  }
  return ''
}

export const clearToken = () => {
  if (localStorage.token) {
    localStorage.setItem('token', '')
  }
  return ''
}
