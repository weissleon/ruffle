import { forwardRef, Ref } from "react";
import { useState, VFC } from "react";
import { IoAdd, IoRemove, IoTrash } from "react-icons/io5";
import { motion } from "framer-motion";

type Props = {
  item: Item;
  onDecrementClicked: (target: string) => void;
  onIncrementClicked: (target: string) => void;
  onRemoveClicked: (target: string) => void;
};
type Item = {
  content: string;
  frequency: number;
};
const CandidateListItem = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { item, onDecrementClicked, onIncrementClicked, onRemoveClicked } =
    props;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function handleOnHover() {
    setIsHovered(true);
  }

  function handleOnHoverLeave() {
    setIsHovered(false);
  }

  return (
    // Main Container
    <motion.div
      ref={ref}
      onMouseOver={handleOnHover}
      onMouseLeave={handleOnHoverLeave}
      className="grid w-full grid-cols-3 content-center border-b border-solid border-slate-200 px-4 py-2 align-middle text-slate-700"
      key={item.content}
    >
      {/* Content */}
      <motion.div className="w-full justify-self-start break-words">
        {item.content}
      </motion.div>

      {/* Frequency */}
      <motion.div className="flex w-full flex-row items-center justify-center gap-2">
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-transparent hover:border-slate-200 active:border-slate-300"
          onClick={() => {
            onDecrementClicked(item.content);
          }}
        >
          <IoRemove />
        </button>
        <motion.div className="flex h-6 w-6 items-center justify-end">
          <span className="align-middle leading-none">{item.frequency}</span>
        </motion.div>
        <button
          className="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-transparent hover:border-slate-200 active:border-slate-300"
          onClick={() => {
            onIncrementClicked(item.content);
          }}
        >
          <IoAdd />
        </button>
      </motion.div>
      <motion.div
        onClick={() => {
          onRemoveClicked(item.content);
        }}
        className={`${
          isHovered ? "flex" : "hidden"
        } h-6 w-6 cursor-pointer items-center justify-center justify-self-end text-center text-lg text-slate-400`}
      >
        <span className="select-none hover:text-slate-500">
          <IoTrash />
        </span>
      </motion.div>
    </motion.div>
  );
});

CandidateListItem.displayName = "CandidateListItem";
export default CandidateListItem;
