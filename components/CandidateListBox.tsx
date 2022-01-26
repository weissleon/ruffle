import React, { useEffect, useRef, VFC } from "react";
import { ItemList } from "../lib/helper";
import CandidateListItem from "./CandidateListItem";

type Props = {
  candidateList: ItemList;
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
      lastElementRef.current?.scrollIntoView(true);
    }
    return () => {};
  }, [candidateList]);

  return (
    <div className="w-full relative h-[200px]  flex flex-col gap-y-2 bg-white">
      <div className="font-bold grid justify-items-center items-center grid-cols-3 w-full bg-slate-100 py-2 shadow-sm px-4">
        <div
          className="cursor-pointer hover:bg-gray-200 w-full flex justify-center"
          onClick={handleOnSortByCandidate}
        >
          <span className="select-none">후보</span>
        </div>
        <div
          className="cursor-pointer hover:bg-gray-200 w-full flex justify-center"
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
  );
};

export default CandidateListBox;
