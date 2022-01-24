import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

type Props = {
  winnerList: string[];
};
const Result: NextPage<Props> = ({ winnerList }) => {
  return (
    <>
      <div>
        <h1>추첨 결과</h1>
        <div>
          {winnerList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
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
