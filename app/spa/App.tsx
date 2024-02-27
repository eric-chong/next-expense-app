import { useEffect, useState } from 'react';

interface IApp {
  children: React.ReactNode;
  loading?: React.ReactNode;
}
export default function App({ children, loading }: IApp) {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  if (isServer) return loading ? loading : null;

  return <div>{typeof window === 'undefined' ? loading : children}</div>;
}
