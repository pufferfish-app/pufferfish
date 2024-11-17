// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Load user from AsyncStorage on app start
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    // Replace this with real authentication logic
    // For demonstration, accept any username/password
    setUser(username);
    await AsyncStorage.setItem('user', username);
  };

  const signup = async (username: string, password: string) => {
    // Replace this with real signup logic
    // For demonstration, accept any username/password
    setUser(username);
    await AsyncStorage.setItem('user', username);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
