import StartButton from "@components/StartButton";
import { NextPage } from "next";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

// import lotteryPic from "../public/lottery.svg";
import Lottery from "@components/icons/Lottery";

type Props = {};

const startPageVariants: Variants = {};
const titleVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

const Start: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <motion.div
      variants={startPageVariants}
      className="flex flex-col items-center justify-center w-full min-h-screen gap-y-16"
      initial="hidden"
      animate="show"
    >
      <motion.h1
        layoutId="title"
        variants={titleVariants}
        className="font-bold text-transparent select-none text-8xl bg-slate-500 bg-clip-text from-purple-400 to-blue-400 bg-gradient-to-r"
      >
        Ruffle
      </motion.h1>
      <StartButton onClick={() => router.push("/")}>Start!</StartButton>
    </motion.div>
  );
};

export default Start;
