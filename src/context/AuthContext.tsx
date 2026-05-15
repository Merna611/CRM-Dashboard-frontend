import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { ME_QUERY } from '../graphql/queries';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/mutations';
import { apolloClient } from '../graphql/client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface MeData { me: User }
interface LoginData { login: { token: string; user: User } }
interface RegisterData { register: { token: string; user: User } }

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const hasToken = Boolean(localStorage.getItem('crm_token'));

  const { data: meData, loading, error: meError } = useQuery<MeData>(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (!hasToken) { setReady(true); return; }
    if (meError) { localStorage.removeItem('crm_token'); setReady(true); return; }
    if (!loading && meData !== undefined) {
      setUser(meData?.me ?? null);
      setReady(true);
    }
  }, [meData, loading, meError, hasToken]);

  const [loginMutation] = useMutation<LoginData>(LOGIN_MUTATION);
  const [registerMutation] = useMutation<RegisterData>(REGISTER_MUTATION);

  const login = async (email: string, password: string) => {
    const { data } = await loginMutation({ variables: { email, password } });
    if (!data) throw new Error('Login failed');
    localStorage.setItem('crm_token', data.login.token);
    setUser(data.login.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await registerMutation({ variables: { input: { name, email, password } } });
    if (!data) throw new Error('Registration failed');
    localStorage.setItem('crm_token', data.register.token);
    setUser(data.register.user);
  };

  const logout = () => {
    localStorage.removeItem('crm_token');
    setUser(null);
    apolloClient.clearStore();
  };

  return (
    <AuthContext.Provider value={{ user, loading: !ready || loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
