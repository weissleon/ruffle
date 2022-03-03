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
  },
  exit: {
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
      className="absolute w-full h-96 bg-lime-400"
    >
      <div className="absolute cursor-pointer top-4 right-4" onClick={onCancel}>
        <IoClose />
      </div>

      <h1 className="text-white">{title}</h1>
      <h2>{description}</h2>
      <h2>{confirmMessage}</h2>
      <Button onClick={onConfirm}>{confirmText}</Button>
      <Button onClick={onCancel}>{cancelText}</Button>
    </motion.div>
  );
};

export default ConfirmBox;
