export function getAuthority() {
  return localStorage.getItem('token');
}

export function setAuthority(token) {
  return localStorage.setItem('token', token);
}
