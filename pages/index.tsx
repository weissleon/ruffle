import type { NextPage } from "next";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { ItemList } from "../lib/helper";

const Home: NextPage = () => {
  // Create router
  const router = useRouter();

  // A state to store current input
  const [item, setItem] = useState<string>("");

  // A state to store item list
  // It is implemented with object so that frequencies are also stored
  const [itemList, setItemList] = useState<ItemList>({});

  // * HANDLERS
  function handleAdd() {
    // If nothing is entered, do nothing
    if (item.trim() === "") return;

    // Update itemList
    setItemList((prev) => {
      // If item already exists, increment frequency by 1
      if (Object.keys(itemList).indexOf(item) >= 0)
        return { ...prev, [item]: prev[item] + 1 };

      // If item is new, create a new entry
      return { ...prev, [item]: 1 };
    });

    // Clean up textField
    setItem("");
  }

  function handleSubmit() {
    if (Object.keys(itemList).length == 0) return;

    router.push({
      pathname: "/result",
      query: { itemList: JSON.stringify(itemList) },
    });
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
      const { [item]: removedItem, ...remainingItemList } = prev;
      return remainingItemList;
    });
  }

  function handleOnFreqIncrement(item: string) {
    setItemList((prev) => {
      return { ...prev, [item]: prev[item] + 1 };
    });
  }

  function handleOnFreqDecrement(item: string) {
    setItemList((prev) => {
      if (prev[item] != 1) return { ...prev, [item]: prev[item] - 1 };

      const { [item]: removedItem, ...remainingItemList } = prev;
      return remainingItemList;
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
      <div className="flex gap-y-4 rounded-md border-2 border-slate-100 flex-col p-10 max-w-md w-2/3 h-min shadow-md shadow-slate-200">
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
        {/* 이름목록박스 */}
        <div className="w-full h-[200px] overflow-y-auto py-2 flex flex-col gap-y-2 bg-white">
          {Object.keys(itemList).map((item) => {
            return (
              <div
                className="flex flex-row justify-between px-4 items-center"
                key={item}
              >
                <div>{item}</div>
                <div className="flex flex-row gap-2 items-center">
                  <input
                    className="cursor-pointer border border-transparent rounded-full hover:border-slate-200 active:border-slate-300 w-6 h-6"
                    type="button"
                    value="-"
                    onClick={() => {
                      handleOnFreqDecrement(item);
                    }}
                  />
                  <div>
                    <span className="align-middle">{itemList[item]}</span>
                  </div>
                  <input
                    className="cursor-pointer border border-transparent rounded-full hover:border-slate-200 active:border-slate-300 w-6 h-6"
                    type="button"
                    value="+"
                    onClick={() => {
                      handleOnFreqIncrement(item);
                    }}
                  />
                </div>
                <div
                  onClick={() => {
                    handleOnRemoveItem(item);
                  }}
                  className="bg-red-500 text-white cursor-pointer flex justify-center items-center text-center shadow-sm text-xs rounded-full w-6 h-6"
                >
                  <span>X</span>
                </div>
              </div>
            );
          })}
        </div>
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
