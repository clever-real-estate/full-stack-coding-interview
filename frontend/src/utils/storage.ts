// Storage utilities for tokens
import { STORAGE_KEYS } from './constants';

export class TokenStorage {
  static setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }
  
  static getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
    return null;
  }
  
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    return null;
  }
  
  static clearTokens(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
  }
  
  static hasValidTokens(): boolean {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  }
}