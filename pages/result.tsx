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
