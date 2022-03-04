import { Center, Container, Group } from "@mantine/core";
import type { GetServerSideProps, NextPage } from "next";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Card from "@components/Card";
import { useRuffleData } from "../../hooks/RuffleDataContext";
import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 1, duration: 1 } },
};

type Props = {};
const Result: NextPage<Props> = () => {
  const { ruffleData } = useRuffleData();

  const title = "추첨 결과";

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="flex min-h-screen flex-col items-center justify-center gap-y-12 bg-gradient-to-tr from-slate-50 to-slate-100"
    >
      <Container>
        <Group position="center" direction="column">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-x-4">
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-lg hover:bg-slate-100 active:bg-slate-200">
                <IoChevronBack />
              </div>
              <main className="flex max-w-[1072px] flex-row flex-wrap gap-x-2 gap-y-2">
                {ruffleData.winnerList &&
                  ruffleData.winnerList.length > 0 &&
                  ruffleData.winnerList.map((content) => (
                    <Card key={content} content={content} />
                  ))}
              </main>
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-lg hover:bg-slate-100 active:bg-slate-200">
                <IoChevronForward />
              </div>
            </div>
          </div>
        </Group>
      </Container>
    </motion.div>
  );
};

export default Result;
