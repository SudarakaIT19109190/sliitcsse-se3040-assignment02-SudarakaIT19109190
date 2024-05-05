"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SessionContextType = {
  userToken: any;
  setUserToken: (token: any) => void;
};

const defaultSession: SessionContextType = {
  userToken: null,
  setUserToken: () => {},
};

const SessionContext = createContext<SessionContextType>(defaultSession);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserTokenState] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    console.log(storedToken);
    if (storedToken) {
      setUserTokenState(storedToken);
    }
  }, []);

  const setUserToken = (token: any) => {
    setUserTokenState(token);

    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
    }
  };

  return (
    <SessionContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
