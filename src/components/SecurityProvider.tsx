import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateCSRFToken } from '@/lib/security';

interface SecurityContextType {
  csrfToken: string;
  refreshCSRFToken: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [csrfToken, setCSRFToken] = useState<string>('');

  const refreshCSRFToken = () => {
    const newToken = generateCSRFToken();
    setCSRFToken(newToken);
    sessionStorage.setItem('csrf_token', newToken);
  };

  useEffect(() => {
    // Initialize CSRF token
    const existingToken = sessionStorage.getItem('csrf_token');
    if (existingToken) {
      setCSRFToken(existingToken);
    } else {
      refreshCSRFToken();
    }

    // Add security headers via meta tags
    const addSecurityMeta = () => {
      const head = document.head;
      
      // Content Security Policy
      const csp = document.createElement('meta');
      csp.httpEquiv = 'Content-Security-Policy';
      csp.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-ancestors 'none';";
      head.appendChild(csp);

      // X-Frame-Options (removed DENY to allow iframe embedding)
      const frameOptions = document.createElement('meta');
      frameOptions.httpEquiv = 'X-Frame-Options';
      frameOptions.content = 'SAMEORIGIN';
      head.appendChild(frameOptions);

      // X-Content-Type-Options
      const contentType = document.createElement('meta');
      contentType.httpEquiv = 'X-Content-Type-Options';
      contentType.content = 'nosniff';
      head.appendChild(contentType);

      // Referrer Policy
      const referrer = document.createElement('meta');
      referrer.name = 'referrer';
      referrer.content = 'strict-origin-when-cross-origin';
      head.appendChild(referrer);
    };

    addSecurityMeta();

    // Refresh CSRF token every 30 minutes
    const interval = setInterval(refreshCSRFToken, 30 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const value = {
    csrfToken,
    refreshCSRFToken
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};