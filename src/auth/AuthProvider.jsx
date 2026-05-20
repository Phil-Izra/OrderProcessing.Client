import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    sessionStorage.getItem('token') || null
  );

  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('token');
    if (!saved) return null;
    try {
      const decoded = jwtDecode(saved);
      return decoded.exp * 1000 > Date.now() ? decoded : null;
    } catch {
      return null;
    }
  });

  const signOut = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const signIn = (authResponse) => {
    sessionStorage.setItem('token', authResponse.token);
    setToken(authResponse.token);
    setUser({
      fullName: authResponse.fullName,
      email: authResponse.email,
      photoUrl: authResponse.photoUrl,
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
