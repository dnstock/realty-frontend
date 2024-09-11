import React from 'react';
import { AuthContext } from './AuthContext';
import { useAuthState } from './useAuthState';

export const AuthProvider = ({ children }) => {
  const authContextValue = useAuthState();

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
