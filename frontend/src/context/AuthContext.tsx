import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../config/auth-config";

interface AuthContextType {
  session: Session | null | undefined;
  userId: string;
  user: User | null | undefined;
  loading: boolean;
  setUserId: (userId: string) => void;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; user: User | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; user: User | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  userId: "",
  user: null,
  loading: false,
  setUserId: () => {},
  signUp: async () => ({ error: null, user: null }),
  signIn: async () => ({ error: null, user: null }),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setSessionData = async function () {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw new Error("");
      setSession(session);
      if (session) setUser(session.user);
      setLoading(false);

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setLoading(false);
        }
      );

      return () => {
        listener.subscription.unsubscribe();
      };
      // Check active sessions and set the user
    };
    setSessionData();
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("--------sign up data---------");
    console.log(data);
    setUser(data.user);
    setSession(data.session);
    setLoading(false);
    return { error, user };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("--------sign in data---------");
    console.log(data);
    setUser(data.user);
    setSession(data.session);
    setLoading(false);
    return { error, user };
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    userId,
    user,
    session,
    loading,
    setUserId,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
