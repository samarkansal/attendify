export const getUserName = () => {
  if (localStorage.userProfile) {
    return JSON.parse(localStorage.userProfile).given_name
  }
  return ''
}

export const getUserEmail = () => {
  if (localStorage.userProfile) {
    return JSON.parse(localStorage.userProfile).email
  }
  return ''
}

export const clearToken = () => {
  if (localStorage.token) {
    localStorage.setItem('token', '')
  }
  if (localStorage.access_token) {
    localStorage.setItem('access_token', '')
  }
  if (localStorage.refresh_token) {
    localStorage.setItem('refresh_token', '')
  }
  if (localStorage.userProfile) {
    localStorage.setItem('userProfile', '')
  }
  return ''
}
