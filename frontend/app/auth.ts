export function isTokenExpired(token: string | null) {
    if (!token) return true;
    
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const tokenExp = tokenData.exp * 1000;
    const currentTime = Date.now();
    
    return currentTime > tokenExp;
  }

  