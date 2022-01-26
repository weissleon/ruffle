import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Card from "../components/Card";
import { generateWinnerList, ItemList } from "../lib/helper";

type Props = {
  winnerList: string[];
};
const Result: NextPage<Props> = ({ winnerList }) => {
  return (
    <div className="min-h-screen flex flex-col gap-y-12 justify-center items-center bg-gradient-to-tr from-slate-500 to-slate-700">
      <div>
<<<<<<< HEAD
        {/* 큰박스 */}
        <div className="justify-center flex h-screen items-center">
          {/* result box */}
          <div className="flex-col">
            <h1 className="flex-col w-full bg-green-700 text-center">
              추첨 결과
            </h1>
            {/* result */}
            <div className="w-full bg-yellow-500 text-center">
              {winnerList.map((item, index) => (
                <div className="w-48" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
=======
        <h1 className="font-bold text-2xl">추첨 결과</h1>
      </div>
      <div className="flex flex-row gap-x-4 justify-center items-center">
        <div className="hover:bg-slate-100 active:bg-slate-200 cursor-pointer w-12 h-12 justify-center items-center flex rounded-full text-lg">
          <IoChevronBack />
        </div>
        <main className="flex flex-row gap-x-2 flex-wrap max-w-[1072px] gap-y-2">
          {winnerList.map((content) => (
            <Card content={content} />
          ))}
        </main>
        <div className="hover:bg-slate-100 active:bg-slate-200 cursor-pointer w-12 h-12 justify-center items-center flex rounded-full text-lg">
          <IoChevronForward />
>>>>>>> ccdc1d762dbe0595fb1c4ce41efd42e0cbea8924
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Convert query.itemList to string [] no matter what the incoming type is.

  const itemList: ItemList =
    query.itemList && typeof query.itemList === "string"
      ? JSON.parse(query.itemList)
      : {};

  // ! TEMPORARY: Generating pickCount. In the future, the pickCount will be received as a query parameter.
  const pickCount = Math.ceil(Object.keys(itemList).length / 2);

  // Generate winnerList
  const winnerList = generateWinnerList(itemList, pickCount);

  // Pass winnerList to the client.
  return {
    props: {
      winnerList,
    },
  };
};

export default Result;
