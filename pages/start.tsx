import StartButton from "@components/StartButton";
import { NextPage } from "next";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

// import lotteryPic from "../public/lottery.svg";
import Lottery from "@components/icons/Lottery";

type Props = {};

const startPageVariants: Variants = {
  exit: {
    opacity: 0,
  },
};

const Start: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <motion.div className="flex items-center justify-center w-full min-h-screen">
      <StartButton onClick={() => router.push("/")}>Start!</StartButton>
    </motion.div>
  );
};

export default Start;
