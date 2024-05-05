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
  isAuthContextLoading: boolean;
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
  isAuthContextLoading: true,
  setUserId: () => {},
  signUp: async () => ({ error: null, user: null }),
  signIn: async () => ({ error: null, user: null }),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthContextLoading, setIsAuthContextLoading] = useState(true);

  async function fetchUserId(email: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROD_API_BASE_URL}/user?email=${email}`
      );
      // const response = await fetch(
      //   `${import.meta.env.VITE_LOCAL_API_BASE_URL}/user?email=${email}`
      // );
      if (!response.ok) {
        throw new Error("unable to fetch userId");
      }
      const data = await response.json();
      console.log("?????//  data with userId  ??????//");
      console.log(data.userId);
      // userId = data.userId;
      setUserId(data.userId);
    } catch (err: any) {
      console.log(err.message);
      // setError(err.message);
    }
  }

  useEffect(() => {
    const setSessionData = async function () {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw new Error("");
      setSession(session);
      if (session) {
        setUser(session.user);
        await fetchUserId(session.user.email!);
      }
      setIsAuthContextLoading(false);

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setIsAuthContextLoading(false);
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
    setIsAuthContextLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new Error("supabase sign up unsuccessful");
    const response = await fetch(
      `${import.meta.env.VITE_PROD_API_BASE_URL}/api/user`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const response = await fetch(`${import.meta.env.VITE_LOCAL_API_BASE_URL}/api/user`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: email,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    if (!response.ok) {
      throw new Error("unable to save user to db");
    }
    const resData = await response.json();
    if (resData.message === "user saved") {
      console.log("--------sign up data---------");
      console.log(data);
      setUser(data.user);
      setSession(data.session);
      await fetchUserId(email);
    }
    setIsAuthContextLoading(false);
    return { error, user };
  };

  const signIn = async (email: string, password: string) => {
    setIsAuthContextLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("--------sign in data---------");
    console.log(data);
    setUser(data.user);
    setSession(data.session);
    await fetchUserId(email);
    setIsAuthContextLoading(false);
    return { error, user };
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserId("");
    localStorage.removeItem("tasksJSON");
  };

  const value = {
    userId,
    user,
    session,
    isAuthContextLoading,
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
