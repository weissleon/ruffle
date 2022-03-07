import React, { MouseEvent, VFC } from "react";
import { motion } from "framer-motion";

type Props = {
  onClick?: (event: MouseEvent) => void;
};

const Overlay: VFC<Props> = ({ onClick = () => {} }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] backdrop-blur-sm"
      onClick={onClick}
    />
  );
};

export default Overlay;
