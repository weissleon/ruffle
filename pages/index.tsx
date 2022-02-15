import type { NextPage } from "next";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { ItemMap, sortMapByKey, sortMapByValue } from "../lib/helper";
import CandidateListBox from "../components/CandidateListBox";
import { useRuffleData } from "../hooks/RuffleDataContext";

import Papa from "papaparse";

const Home: NextPage = () => {
  // Create router
  const router = useRouter();
  const { setRuffleData } = useRuffleData()!;

  // A state to store current input
  const [item, setItem] = useState<string>("");
  const [csvFileName, setCsvFileName] = useState("");

  // A state to store item list
  // It is implemented with object so that frequencies are also stored
  const [itemMap, setItemMap] = useState<ItemMap>(new Map<string, number>());

  // A state to store pickSize
  const [pickSize, setPickSize] = useState<number>(0);

  // * HANDLERS
  function handleAdd() {
    // If nothing is entered, do nothing
    const candidate = item.trim();
    if (candidate === "") return;

    // Update itemList
    setItemMap((prev) => {
      const newMap = new Map(prev);

      if (prev.has(candidate)) newMap.set(candidate, prev.get(candidate)! + 1);
      else newMap.set(candidate, 1);
      return newMap;
    });

    // Clean up textField
    setItem("");
  }

  function handleSubmit() {
    if (itemMap.size == 0) return;

    setRuffleData((draft) => {
      draft.itemMap = itemMap;
      draft.pickSize = pickSize;
    });

    router.push({
      pathname: "/result",
    });
  }

  function handleOnSortByCandidate() {
    setItemMap(sortMapByKey(itemMap));
  }

  function handleOnSortByFrequency() {
    setItemMap(sortMapByValue(itemMap));
  }

  function handleOnItemInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setItem(value);
  }

  function handleOnEnterPressed(event: KeyboardEvent<HTMLInputElement>) {
    // Add item when ENTER key is clicked.
    if (event.key == "Enter") handleAdd();
  }

  function handleOnPickSizeChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value.trim());
    if (isNaN(value)) return;
    if (value < 0) return;
    if (value > itemMap.size) return;

    setPickSize(value);
  }

  function handleOnFileUploaded(event: ChangeEvent<HTMLInputElement>) {
    console.log("Called!");
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return setCsvFileName("");

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      const rawText = evt.target ? (evt.target.result as string) : null;
      if (!rawText) return;

      const result = Papa.parse<{ Name: string; Frequency: number }>(rawText, {
        header: true,
      });

      const tempMap = new Map(itemMap);
      result.data.forEach((datum) => {
        const [name, frequency] = Object.values(datum) as string[];
        if (tempMap.get(name))
          tempMap.set(name, tempMap.get(name)! + parseInt(frequency));
        else tempMap.set(name, parseInt(frequency));
      });

      setItemMap(tempMap);
    };

    setCsvFileName(file.name);

    event.target.value = "";
  }

  function handleOnPickSizeIncrement() {
    if (pickSize === itemMap.size) return;
    setPickSize((prev) => prev + 1);
  }

  function handleOnPickSizeDecrement() {
    if (pickSize <= 0) return;
    setPickSize((prev) => prev - 1);
  }

  function handleOnRemoveItem(item: string) {
    setItemMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(item);
      return newMap;
    });
  }

  function handleOnFreqIncrement(item: string) {
    setItemMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(item, prev.get(item)! + 1);
      return newMap;
    });
  }

  function handleOnFreqDecrement(item: string) {
    setItemMap((prev) => {
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
        {/* CSV 파일 불러오기 박스 */}
        <div className="flex flex-row items-center py-2 gap-x-4">
          <label
            className="px-4 py-2 rounded-lg cursor-pointer bg-slate-300"
            htmlFor="csv-import"
          >
            CSV 파일 불러오기
          </label>
          <input
            onChange={handleOnFileUploaded}
            className="hidden"
            type="file"
            id="csv-import"
            accept=".csv"
          />
          <div>{csvFileName}</div>
        </div>
        <CandidateListBox
          candidateList={itemMap}
          handleOnFreqDecrement={handleOnFreqDecrement}
          handleOnFreqIncrement={handleOnFreqIncrement}
          handleOnRemoveItem={handleOnRemoveItem}
          handleOnSortByCandidate={handleOnSortByCandidate}
          handleOnSortByFrequency={handleOnSortByFrequency}
        />
        <div className="flex flex-row items-center w-full px-4 py-2 shadow-md bg-slate-200 gap-x-4">
          <div>추첨인원: </div>
          <div className="flex gap-x-2">
            <button
              onClick={handleOnPickSizeDecrement}
              className="w-8 h-8 rounded-lg bg-slate-300"
            >
              -
            </button>
            <input
              value={pickSize}
              onChange={handleOnPickSizeChange}
              className="max-w-[40px] text-center rounded-md"
              type="text"
            />
            <button
              onClick={handleOnPickSizeIncrement}
              className="w-8 h-8 rounded-lg bg-slate-300"
            >
              +
            </button>
          </div>
        </div>
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
