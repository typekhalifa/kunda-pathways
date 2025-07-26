// Security utilities for input validation and sanitization

export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe\b[^>]*>/gi, '')
    .replace(/<object\b[^>]*>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone);
};

export const rateLimiter = (() => {
  const attempts = new Map<string, { count: number; lastAttempt: number }>();
  
  return {
    isAllowed: (identifier: string, maxAttempts = 5, windowMs = 60000): boolean => {
      const now = Date.now();
      const userAttempts = attempts.get(identifier);
      
      if (!userAttempts) {
        attempts.set(identifier, { count: 1, lastAttempt: now });
        return true;
      }
      
      if (now - userAttempts.lastAttempt > windowMs) {
        attempts.set(identifier, { count: 1, lastAttempt: now });
        return true;
      }
      
      if (userAttempts.count >= maxAttempts) {
        return false;
      }
      
      userAttempts.count++;
      userAttempts.lastAttempt = now;
      return true;
    },
    
    reset: (identifier: string) => {
      attempts.delete(identifier);
    }
  };
})();

export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

export const validateCSRFToken = (token: string, expected: string): boolean => {
  return token === expected;
};