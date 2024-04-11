import { ReactNode, createContext, useState } from 'react';

interface IDrawerContext {
  isOpen: boolean;
  setIsOpen: Function;
}
export const DrawerContext = createContext<IDrawerContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export default function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}
