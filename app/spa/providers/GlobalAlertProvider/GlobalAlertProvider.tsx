'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

interface IGlobalAlertContext {
  error: string | null;
  resetError: Function;
  setError: Function;
}

export const GlobalAlertContext = createContext<IGlobalAlertContext>({
  error: null,
  resetError: () => {},
  setError: () => {},
});

export default function GlobalAlertProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [error, setError] = useState<string | null>(null);

  const resetError = useCallback(() => setError(null), []);

  return (
    <GlobalAlertContext.Provider value={{ error, resetError, setError }}>
      {children}
    </GlobalAlertContext.Provider>
  );
}
