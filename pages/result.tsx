import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

type Props = {
  winnerList: string[];
};
const Result: NextPage<Props> = ({ winnerList }) => {
  return (
    <>
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const itemList = query.itemList as string[];
  const winnerSet: Set<string> = new Set();
  const PICK_NUM = Math.ceil(itemList.length / 2);

  while (winnerSet.size < PICK_NUM) {
    const index = Math.floor(Math.random() * itemList!.length);
    winnerSet.add(itemList[index]);
  }

  return {
    props: {
      winnerList: Array.from(winnerSet),
    },
  };
};

export default Result;
