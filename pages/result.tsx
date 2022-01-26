import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { generateWinnerList, ItemList } from "../lib/helper";

type Props = {
  winnerList: string[];
};
const Result: NextPage<Props> = ({ winnerList }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-slate-500 to-slate-700">
      <div className="flex flex-col gap-y-4 items-center w-2/3 max-w-md bg-slate-100 px-4 py-4">
        <h1 className="font-bold">추첨 결과</h1>
        <div className="bg-white h-52 flex flex-col w-full py-2 gap-y-2 flex-wrap overflow-y-auto">
          {winnerList.map((item, index) => (
            <div className="px-4" key={index}>
              {item}
            </div>
          ))}
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
