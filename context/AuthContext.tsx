import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  isLogged: boolean;
  setIsLogged: (status: boolean) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLoggedState] = useState(false);
  const [loading, setLoading] = useState(true);

  const restoreAuthState = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem("isLogged");
      if (storedStatus === "true") {
        setIsLoggedState(true);
      }
    } catch (error) {
      console.error("Error restoring auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreAuthState();
  }, []);

  const setIsLogged = async (status: boolean) => {
    try {
      if (status) {
        await AsyncStorage.setItem("isLogged", "true");
      } else {
        await AsyncStorage.removeItem("isLogged");
      }
      setIsLoggedState(status);
    } catch (error) {
      console.error("Error updating auth state:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
