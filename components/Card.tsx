import React, { MouseEvent, useState, VFC } from "react";
import { motion } from "framer-motion";
type Props = {
  content: string;
};
const Card: VFC<Props> = ({ content }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  function handleOnCardClick(event: MouseEvent<HTMLDivElement>) {
    setIsFlipped((prev) => !prev);
  }

  return isFlipped ? (
    <div className="flex justify-center items-center w-52 h-80 bg-red-300 cursor-pointer rounded-md">
      {content}
    </div>
  ) : (
    <motion.div
      onClick={handleOnCardClick}
      whileHover={{ scale: 1.05 }}
      className="w-52 h-80 bg-blue-300 cursor-pointer rounded-md"
    ></motion.div>
  );
};

export default Card;
