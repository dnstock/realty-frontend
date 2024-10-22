import { AuthContext } from 'context';
import { useAuthState } from 'hooks';

export const AuthProvider = ({ children }) => {
  const authContextValue = useAuthState();

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
