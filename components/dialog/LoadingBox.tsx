import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useEffect, useState, VFC } from "react";
import { IoClose } from "react-icons/io5";
import dynamic from "next/dynamic";

const LoadingAnimation = dynamic(
  import("@components/animation/LoadingAnimation"),
  {
    ssr: false,
  }
);

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
      className="relative h-full w-full  "
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {cancellable && isLoading && (
        <motion.div
          variants={textVariants}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onCancel}
        >
          <IoClose />
        </motion.div>
      )}
      <div className="flex flex-col items-center justify-center p-12">
        <div className="h-56">
          <LoadingAnimation isLoading={isLoading} />
        </div>

        <AnimatePresence exitBeforeEnter={true}>
          {isLoading ? (
            <motion.span
              key={"loadingText"}
              className="text-xl font-semibold text-slate-700"
              variants={textVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {loadingText}
            </motion.span>
          ) : (
            <motion.span
              key={"completeText"}
              className="text-xl font-semibold text-teal-500"
              variants={textVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {completeText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingBox;
