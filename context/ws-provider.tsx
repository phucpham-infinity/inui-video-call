"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

type WSProviderProps = { children: ReactNode; url: string };
const WSStateContext = createContext<WebSocket | null>(null);

export const WSProvider = ({ children, url }: WSProviderProps): JSX.Element => {
  const wsInstance = useMemo(
    () =>
      typeof window != "undefined"
        ? new WebSocket(`wss://103.56.163.217:8443${url}`)
        : null,
    []
  );

  useEffect(() => {
    return () => {
      wsInstance?.close();
    };
  }, []);

  return (
    <WSStateContext.Provider value={wsInstance}>
      {children}
    </WSStateContext.Provider>
  );
};

export const useWS = (): WebSocket => {
  const context = useContext(WSStateContext);

  if (context == undefined) {
    throw new Error("useWS must be used within a WSProvider");
  }

  return context;
};
