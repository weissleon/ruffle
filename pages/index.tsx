import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  function showAlert() {
    alert("클릭했음ㅎ");
  }

  function handleSubmit() {
    confirm("할까?");
  }

  return (
    //
    // 젤 큰 박스
    <div className="justify-center flex h-screen items-center ">
      {/* screen : 화면 전체 / 내용물 사이즈(화면높이만큼) */}
      {/* 컨텐트박스 */}
      <div className="flex gap-y-4 bg-yellow-500 flex-col p-10 w-2/3 h-min">
        {/* 인풋박스 */}
        <div className="flex flex-row w-full">
          <input className="w-2/3 mr-4" type="text" />
          <input
            className="bg-white px-4 py-2 cursor-pointer w-1/3"
            onClick={showAlert}
            type="button"
            value="추가"
          />
        </div>
        {/* 이름목록박스 */}
        <div className="w-full min-h-[200px] bg-white "></div>
        <input
          className="w-full px-4 py-2 cursor-pointer bg-lime-400 rounded-md hover:bg-lime-500"
          onClick={handleSubmit}
          type="button"
          value="추첨하기"
        />
      </div>
    </div>
  );
};

export default Home;
