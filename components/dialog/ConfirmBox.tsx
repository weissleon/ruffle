import Button from "@components/Button";
import React, { VFC } from "react";
import { IoClose } from "react-icons/io5";
import { motion, Variants } from "framer-motion";
type Props = {
  total: number;
  pickSize: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const cardVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.05 },
  },

  exit: {
    opacity: 0,
  },
};

const textVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
  exit: {
    x: 100,
    opacity: 0,
  },
};

const borderVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
  exit: {
    y: -100,
    opacity: 0,
  },
};

const ConfirmBox: VFC<Props> = ({
  total,
  pickSize,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const title = "최종 확인";
  const description = `${total}개 중 ${pickSize}개를 추첨합니다.`;
  const confirmMessage = "정말로 진행하시겠습니까?";
  const confirmText = "확인";
  const cancelText = "취소";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative w-full"
    >
      <motion.div
        variants={borderVariants}
        className="absolute h-4 w-full bg-gradient-to-r from-blue-400 to-purple-400"
      ></motion.div>
      <div className="flex flex-col items-center p-12">
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onCancel}
        >
          <IoClose color="white" stroke="24" />
        </div>

        <motion.h1
          variants={textVariants}
          className="self-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-extrabold text-transparent"
        >
          {title}
        </motion.h1>
        <motion.h2
          variants={textVariants}
          className="mt-8 text-xl text-slate-700"
        >
          {description}
        </motion.h2>
        <motion.h2
          variants={textVariants}
          className="mt-4 text-xl text-slate-700"
        >
          {confirmMessage}
        </motion.h2>
        <motion.div
          variants={textVariants}
          className="mt-8 flex w-full flex-col gap-y-4 px-12"
        >
          <Button gradient fullWidth size="large" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button fullWidth size="large" onClick={onCancel}>
            {cancelText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConfirmBox;
