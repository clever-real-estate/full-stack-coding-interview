// Input validation utilities
import DOMPurify from 'dompurify';

export class InputValidator {
  static sanitizeText(input: string): string {
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
    }
    // Server-side fallback
    return input.replace(/[<>]/g, '');
  }
  
  static sanitizeEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = this.sanitizeText(email).toLowerCase();
    return emailRegex.test(sanitized) ? sanitized : '';
  }
  
  static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const minLength = 8;
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}