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
  winnerList?: string[];
};

type ProviderProps = {
  children: ReactNode;
};

const RuffleData = createContext<{
  ruffleData: RuffleData;
  setRuffleData: Updater<RuffleData>;
} | null>(null);

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
  const context = useContext(RuffleData);
  if (!context) throw new Error("RuffleDataProvider not found!");
  return context;
};
