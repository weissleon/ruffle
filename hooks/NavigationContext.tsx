import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  VFC,
} from "react";
import { useDidUpdate } from "./useDidUpdate";

type ProviderProps = {
  children: ReactNode;
};

const IsNavigatingContext = createContext<boolean | null>(null);

export const IsNavigatingProvider: VFC<ProviderProps> = ({ children }) => {
  const router = useRouter();
  const isNavigating = useRef(false);

  useDidUpdate(() => {
    isNavigating.current = true;
  }, [router.asPath]);
  return (
    <IsNavigatingContext.Provider value={isNavigating.current}>
      {children}
    </IsNavigatingContext.Provider>
  );
};

export const useIsNavigating = () => {
  const context = useContext(IsNavigatingContext);

  return context;
};
