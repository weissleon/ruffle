import type { NextPage } from "next";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { ItemList, sortMapByKey, sortMapByValue } from "../lib/helper";
import CandidateListItem from "../components/CandidateListItem";
import CandidateListBox from "../components/CandidateListBox";

const Home: NextPage = () => {
  // Create router
  const router = useRouter();

  // A state to store current input
  const [item, setItem] = useState<string>("");

  // A state to store item list
  // It is implemented with object so that frequencies are also stored
  const [itemList, setItemList] = useState<ItemList>(new Map<string, number>());

  // * HANDLERS
  function handleAdd() {
    // If nothing is entered, do nothing
    const candidate = item.trim();
    if (candidate === "") return;

    // Update itemList
    setItemList((prev) => {
      const newMap = new Map(prev);

      if (prev.has(candidate)) newMap.set(candidate, prev.get(candidate)! + 1);
      else newMap.set(candidate, 1);
      return newMap;
    });

    // Clean up textField
    setItem("");
  }

  function handleSubmit() {
    if (itemList.size == 0) return;

    router.push({
      pathname: "/result",
      query: {
        itemList: JSON.stringify(Object.fromEntries(itemList.entries())),
      },
    });
  }

  function handleOnSortByCandidate() {
    setItemList(sortMapByKey(itemList));
  }

  function handleOnSortByFrequency() {
    setItemList(sortMapByValue(itemList));
  }

  function handleOnItemInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setItem(value);
  }

  function handleOnEnterPressed(event: KeyboardEvent<HTMLInputElement>) {
    // Add item when ENTER key is clicked.
    if (event.key == "Enter") handleAdd();
  }

  function handleOnRemoveItem(item: string) {
    setItemList((prev) => {
      const newMap = new Map(prev);
      newMap.delete(item);
      return newMap;
    });
  }

  function handleOnFreqIncrement(item: string) {
    setItemList((prev) => {
      const newMap = new Map(prev);
      newMap.set(item, prev.get(item)! + 1);
      return newMap;
    });
  }

  function handleOnFreqDecrement(item: string) {
    setItemList((prev) => {
      const newMap = new Map(prev);
      if (prev.get(item) === 1) newMap.delete(item);
      else newMap.set(item, prev.get(item)! - 1);

      return newMap;
    });
  }

  return (
    // 젤 큰 박스
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-4 ">
      {/* screen : 화면 전체 / 내용물 사이즈(화면높이만큼) */}

      <div>
        <h1 className="text-xl font-bold">RUFFLE</h1>
      </div>
      {/* 컨텐트박스 */}
      <div className="flex flex-col w-2/3 max-w-md p-10 border-2 rounded-md shadow-md gap-y-4 border-slate-100 h-min shadow-slate-200 bg-slate-200">
        {/* 인풋박스 */}
        <div className="flex flex-row w-full">
          <input
            className="w-2/3 px-4 mr-4 border-2 border-slate-400"
            type="text"
            value={item}
            onChange={handleOnItemInputChange}
            onKeyPress={handleOnEnterPressed}
          />
          <input
            className="w-1/3 px-4 py-2 bg-white cursor-pointer"
            onClick={handleAdd}
            type="button"
            value="추가"
          />
        </div>
        <CandidateListBox
          candidateList={itemList}
          handleOnFreqDecrement={handleOnFreqDecrement}
          handleOnFreqIncrement={handleOnFreqIncrement}
          handleOnRemoveItem={handleOnRemoveItem}
          handleOnSortByCandidate={handleOnSortByCandidate}
          handleOnSortByFrequency={handleOnSortByFrequency}
        />
        <input
          className="w-full px-4 py-2 transition-all rounded-md shadow-sm cursor-pointer bg-lime-400 hover:bg-lime-500 hover:shadow-md"
          onClick={handleSubmit}
          type="button"
          value="추첨하기"
        />
      </div>
    </div>
  );
};

export default Home;
