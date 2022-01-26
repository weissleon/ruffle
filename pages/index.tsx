import type { NextPage } from "next";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const [item, setItem] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);
  function handleAdd() {
    // If nothing is
    if (item.trim() === "") return;
    setItemList((prev) => [...prev, item]); // spread
    setItem("");
  }

  function handleSubmit() {
    if (itemList.length <= 0) return alert("값을 입력해주세요");
    router.push({
      pathname: "/result",
      query: { itemList: itemList },
    });
  }

  function handleOnItemInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setItem(value);
  }
  function handleOnItemRemove(index: number) {
    // alert(index);
    const filteredItemList = itemList.filter((value, i) => i !== index);
    setItemList(filteredItemList);
  }
  function handleOnEnterPressed(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") handleAdd();
  }

  return (
    //
    // 젤 큰 박스
    <div className="justify-center flex h-screen items-center ">
      {/* screen : 화면 전체 / 내용물 사이즈(화면높이만큼) */}
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
        <div className="w-full h-[200px] overflow-y-auto bg-white">
          {itemList.map((item, index) => {
            return (
              <div key={index} className="flex justify-between">
                <div>{item}</div>
                <input
                  type="button"
                  className="px-2 cursor-pointer"
                  value="X"
                  onClick={() => handleOnItemRemove(index)}
                />
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
