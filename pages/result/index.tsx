import type { NextPage } from "next";

import Card from "@components/Card";
import { useRuffleData } from "../../hooks/RuffleDataContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Button from "@components/Button";
import { useRouter } from "next/router";
import Confetti from "@components/Confetti";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import CardBack from "@components/card/CardBack";
import WinnerBox from "@components/WinnerBox";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const overlayVariants: Variants = {
  idle: { opacity: 0, background: "#e2e8f0" },
  shine: {
    opacity: 1,
    background: "#ffffff",
    transition: {
      opacity: {
        duration: 2,
      },
      duration: 3,
    },
  },
  exit: {
    opacity: 0,
  },
};

const titleVariants: Variants = {
  idle: { opacity: 1 },
  shine: {
    opacity: 0,
  },
};

type Props = {};
const Result: NextPage<Props> = () => {
  const { ruffleData } = useRuffleData();
  const router = useRouter();

  const [isResultShown, setIsResultShown] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  const title = "결과를 확인해보세요";

  function handleOnReveal() {
    setIsAnimating(true);
  }

  function handleOnRestart() {
    router.replace("/start");
  }

  const confetti = useMemo(() => <Confetti />, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative inset-0 z-0 flex h-screen w-full flex-col items-center justify-center gap-y-12"
    >
      {/* Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key={"pageOverlay"}
            variants={overlayVariants}
            initial="idle"
            animate="shine"
            exit="exit"
            ref={overlayRef}
            className="absolute inset-0 z-50 bg-slate-200"
            onAnimationComplete={() => {
              setIsAnimating(false);
              setIsResultShown(true);
            }}
          />
        )}
      </AnimatePresence>

      {!isResultShown && (
        <>
          <motion.h1
            variants={titleVariants}
            initial="idle"
            animate={isAnimating ? "shine" : "idle"}
            className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-2xl font-bold text-transparent"
          >
            {title}
          </motion.h1>

          <Card isAnimating={isAnimating} onClick={handleOnReveal} />
        </>
      )}
      {isResultShown && (
        <>
          {confetti}
          <WinnerBox
            list={ruffleData.winnerList!}
            onRestartClicked={handleOnRestart}
          />
        </>
      )}
    </motion.div>
  );
};

export default Result;
