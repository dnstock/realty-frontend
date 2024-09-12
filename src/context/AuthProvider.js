import { AuthContext } from './AuthContext';
import { useAuthState } from '../hooks/useAuthState';

export const AuthProvider = ({ children }) => {
  const authContextValue = useAuthState();

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
