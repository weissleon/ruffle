import { Paper } from "@mantine/core";
import React, { useEffect, useRef, VFC } from "react";
import { ItemMap } from "../lib/helper";
import CandidateListItem from "./CandidateListItem";
import { motion } from "framer-motion";

type Props = {
  candidateList: ItemMap;
  handleOnSortByCandidate: () => void;
  handleOnSortByFrequency: () => void;
  handleOnFreqIncrement: (item: string) => void;
  handleOnRemoveItem: (item: string) => void;
  handleOnFreqDecrement: (item: string) => void;
};
const CandidateListBox: VFC<Props> = ({
  candidateList,
  handleOnFreqDecrement,
  handleOnFreqIncrement,
  handleOnRemoveItem,
  handleOnSortByCandidate,
  handleOnSortByFrequency,
}) => {
  const lastElementRef = useRef<HTMLDivElement>(null);
  const lastListCount = useRef<number>(candidateList.size);

  useEffect(() => {
    if (lastListCount.current !== candidateList.size) {
      lastListCount.current = candidateList.size;
      lastElementRef.current?.scrollIntoView({ block: "nearest" });
    }
    return () => {};
  }, [candidateList]);

  return (
    <Paper shadow={"xs"}>
      <motion.div className="relative flex h-[200px]  w-full flex-col bg-white">
        <motion.div className="grid w-full grid-cols-3 items-center justify-items-center bg-slate-100 font-bold shadow-sm">
          <motion.div
            className="flex w-full cursor-pointer justify-center px-4 py-2 hover:bg-gray-200"
            onClick={handleOnSortByCandidate}
          >
            <span className="select-none">후보</span>
          </motion.div>
          <motion.div
            className="flex w-full cursor-pointer justify-center px-4 py-2 hover:bg-gray-200"
            onClick={handleOnSortByFrequency}
          >
            <span className="select-none">빈도수</span>
          </motion.div>
        </motion.div>
        <motion.div className="w-full overflow-y-auto">
          {Array.from(candidateList.entries()).map((item, index) => {
            return (
              <CandidateListItem
                ref={candidateList.size === index + 1 ? lastElementRef : null}
                item={{ content: item[0], frequency: item[1] }}
                key={item[0]}
                onIncrementClicked={handleOnFreqIncrement}
                onDecrementClicked={handleOnFreqDecrement}
                onRemoveClicked={handleOnRemoveItem}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </Paper>
  );
};

export default CandidateListBox;
