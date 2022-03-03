import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useEffect, useState, VFC } from "react";
import { IoClose } from "react-icons/io5";

type Props = { isLoading?: boolean; onCancel?: () => void };

const cardVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const LoadingBox: VFC<Props> = ({ isLoading = true, onCancel = () => {} }) => {
  const loadingText = "추첨 중...";
  const completeText = "추첨이 완료되었습니다.";
  const cancelTimeout = 3000;
  const [cancellable, setCancellable] = useState<boolean>(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setCancellable(true);
    }, cancelTimeout);

    return () => {
      clearTimeout(handle);
    };
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative w-full bg-blue-400 h-80"
    >
      {cancellable && (
        <motion.div
          variants={textVariants}
          className="absolute cursor-pointer top-4 right-4"
          onClick={onCancel}
        >
          <IoClose />
        </motion.div>
      )}
      <AnimatePresence>
        {isLoading ? (
          <motion.div variants={textVariants}>{loadingText}</motion.div>
        ) : (
          <motion.div variants={textVariants}>{completeText}</motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingBox;
