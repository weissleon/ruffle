import StartButton from "@components/StartButton";
import { NextPage } from "next";
import React, { useEffect, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { useIsNavigating } from "hooks/NavigationContext";
// import AnimatingBackground from "@components/AnimatingBackground";
import dynamic from "next/dynamic";

const AnimatingBackground = dynamic(import("@components/AnimatingBackground"), {
  ssr: false,
});

const mainTitle = `Ruffle`;

type Props = {};
const Start: NextPage<Props> = ({}) => {
  const router = useRouter();
  const isNavigating = useIsNavigating();

  const titleVariants: Variants = useMemo(
    () => ({
      hidden: {
        y: isNavigating ? 0 : "-100px",
        fontSize: "6rem",
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
      },
    }),
    [isNavigating]
  );

  return (
    <motion.div
      className="flex min-h-screen w-full flex-col items-center justify-center gap-y-16 overflow-hidden"
      initial="hidden"
      animate="show"
    >
      {useMemo(
        () => (
          <AnimatingBackground />
        ),
        []
      )}
      <motion.h1
        layoutId="title"
        transition={{
          layout: { ease: "easeInOut", duration: 0.5 },
        }}
        variants={titleVariants}
        className="select-none bg-slate-500 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold text-transparent"
      >
        {mainTitle}
      </motion.h1>
      <StartButton onClick={() => router.push("/")}>Start!</StartButton>
    </motion.div>
  );
};

export default Start;
