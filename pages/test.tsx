// import Lottie from "@components/Lottie";
import Portal from "@components/Portal";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(import("@components/animation/LoadingAnimation"), {
  ssr: false,
});
type Props = {};

const Test = (props: Props) => {
  const [isNext, setIsNext] = useState<boolean>(true);

  return (
    <main
      onClick={() => setIsNext((prev) => !prev)}
      className="absolute inset-0 flex items-center justify-center bg-slate-400"
    >
      <LayoutGroup>
        <motion.div
          layout
          className="flex w-2/3 items-center justify-center bg-white will-change-transform"
        >
          <AnimatePresence exitBeforeEnter={true}>
            {isNext ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                key={1}
              >
                <Lottie />
              </motion.div>
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0 }}
                key={2}
                className="h-16"
              >
                2
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </main>
  );
};

export default Test;
