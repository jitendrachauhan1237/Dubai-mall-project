import { createContext, useContext } from 'react';

export const ReadyContext = createContext({
  isReady: false,
  setIsReady: () => {},
});

export function useReady() {
  const context = useContext(ReadyContext);
  if (!context) {
    throw new Error('useReady must be used within ReadyContext.Provider');
  }
  return context;
}
