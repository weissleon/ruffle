import { Paper } from "@mantine/core";
import React, { useEffect, useRef, VFC } from "react";
import { ItemMap } from "../lib/helper";
import CandidateListItem from "./CandidateListItem";

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
      <div className="w-full relative h-[200px]  flex flex-col bg-white">
        <div className="grid items-center w-full grid-cols-3 font-bold shadow-sm justify-items-center bg-slate-100">
          <div
            className="flex justify-center w-full px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={handleOnSortByCandidate}
          >
            <span className="select-none">후보</span>
          </div>
          <div
            className="flex justify-center w-full px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={handleOnSortByFrequency}
          >
            <span className="select-none">빈도수</span>
          </div>
        </div>
        <div className="overflow-y-auto">
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
        </div>
      </div>
    </Paper>
  );
};

export default CandidateListBox;
