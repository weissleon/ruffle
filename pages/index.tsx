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
    <div className="justify-center gap-y-4 flex min-h-screen flex-col items-center ">
      {/* screen : 화면 전체 / 내용물 사이즈(화면높이만큼) */}

      <div>
        <h1 className="font-bold text-xl">RUFFLE</h1>
      </div>
      {/* 컨텐트박스 */}
      <div className="flex gap-y-4 rounded-md border-2 border-slate-100 flex-col p-10 max-w-md w-2/3 h-min shadow-md shadow-slate-200 bg-slate-200">
        {/* 인풋박스 */}
        <div className="flex flex-row w-full">
          <input
            className="w-2/3 mr-4 px-4 border-2 border-slate-400"
            type="text"
            value={item}
            onChange={handleOnItemInputChange}
            onKeyPress={handleOnEnterPressed}
          />
          <input
            className="bg-white px-4 py-2 cursor-pointer w-1/3"
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
          className="w-full px-4 py-2 cursor-pointer bg-lime-400 rounded-md shadow-sm hover:bg-lime-500 hover:shadow-md transition-all"
          onClick={handleSubmit}
          type="button"
          value="추첨하기"
        />
      </div>
    </div>
  );
};

export default Home;
