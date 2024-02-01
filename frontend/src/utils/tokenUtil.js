export function getToken() {
  const storedTokenDataString = localStorage.getItem('token');

  if (storedTokenDataString) {
    const storedTokenData = JSON.parse(storedTokenDataString);
    const currentTime = new Date().getTime();

    if (currentTime < storedTokenData.expiresAt) {
      localStorage.setItem('username', storedTokenData.username);
      return storedTokenData.token;
    } else {
      localStorage.removeItem('authToken');
    }
  }

  return null;
}

export function getUsername() {
  if (getToken()) {
    return localStorage.getItem('username');
  }
  return null;
}
