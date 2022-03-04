import CardBack from "@components/card/CardBack";
import React from "react";
import { motion } from "framer-motion";
type Props = {};

const Test = (props: Props) => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <motion.div
        className="relative flex h-80 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-md"
        whileHover={{ scale: 1.02 }}
      >
        <div className="h-80 w-52">
          <CardBack />
        </div>
      </motion.div>
    </main>
  );
};

export default Test;
