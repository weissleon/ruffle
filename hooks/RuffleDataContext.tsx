import React, { createContext, ReactNode, useContext, VFC } from "react";

import { Updater, useImmer } from "use-immer";
import { ItemMap } from "../lib/helper";

// type Candidate = {
//   content: string;
//   frequency?: number;
// };

type RuffleData = {
  itemMap: ItemMap;
  pickSize: number;
};

type ProviderProps = {
  children: ReactNode;
};

const RuffleData = createContext<
  | {
      ruffleData: RuffleData;
      setRuffleData: Updater<RuffleData>;
    }
  | undefined
>(undefined);

export const RuffleDataProvider: VFC<ProviderProps> = ({ children }) => {
  const [ruffleData, setRuffleData] = useImmer<RuffleData>({
    itemMap: new Map(),
    pickSize: 0,
  });
  return (
    <RuffleData.Provider value={{ ruffleData, setRuffleData }}>
      {children}
    </RuffleData.Provider>
  );
};

export const useRuffleData = () => {
  return useContext(RuffleData);
};
