/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface IAuthState {
  token: string;
  user: User;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User;
  loading: boolean;
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@goBarber:token',
        '@goBarber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@goBarber:token', token],
      ['@goBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@goBarber:token', '@goBarber:user']);

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
