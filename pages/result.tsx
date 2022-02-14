import type { GetServerSideProps, NextPage } from "next";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Card from "../components/Card";
import { useRuffleData } from "../hooks/RuffleDataContext";
import { generateWinnerList } from "../lib/helper";

type Props = {};
const Result: NextPage<Props> = () => {
  const { ruffleData } = useRuffleData()!;

  const winnerList = generateWinnerList(
    ruffleData.itemMap,
    ruffleData.pickSize
  );

  const title = "추첨 결과";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-12 bg-gradient-to-tr from-slate-500 to-slate-700">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-x-4">
          <div className="flex items-center justify-center w-12 h-12 text-lg rounded-full cursor-pointer hover:bg-slate-100 active:bg-slate-200">
            <IoChevronBack />
          </div>
          <main className="flex flex-row gap-x-2 flex-wrap max-w-[1072px] gap-y-2">
            {winnerList.map((content) => (
              <Card key={content} content={content} />
            ))}
          </main>
          <div className="flex items-center justify-center w-12 h-12 text-lg rounded-full cursor-pointer hover:bg-slate-100 active:bg-slate-200">
            <IoChevronForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const isReloaded = typeof req.headers.referer === "undefined";

  // Redirect to home page if the user performed refresh
  if (isReloaded)
    return { redirect: { destination: "/", permanent: false }, props: {} };

  return {
    props: {},
  };
};

export default Result;
