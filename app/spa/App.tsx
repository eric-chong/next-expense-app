import { useEffect, useState } from 'react';

interface IApp {
  children: React.ReactNode;
}
export default function App({ children }: IApp) {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  if (isServer) return null;

  return <div>{typeof window === 'undefined' ? null : children}</div>;
}
