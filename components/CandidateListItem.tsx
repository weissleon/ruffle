import { forwardRef, Ref } from "react";
import { useState, VFC } from "react";
import { IoAdd, IoRemove, IoTrash } from "react-icons/io5";

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
    <div
      ref={ref}
      onMouseOver={handleOnHover}
      onMouseLeave={handleOnHoverLeave}
      className="grid content-center w-full grid-cols-3 px-4 py-2 align-middle border-b border-solid text-slate-700 border-slate-200"
      key={item.content}
    >
      {/* Content */}
      <div className="w-full break-words justify-self-start">
        {item.content}
      </div>

      {/* Frequency */}
      <div className="flex flex-row items-center justify-center w-full gap-2">
        <button
          className="flex items-center justify-center w-6 h-6 border border-transparent rounded-full cursor-pointer hover:border-slate-200 active:border-slate-300"
          onClick={() => {
            onDecrementClicked(item.content);
          }}
        >
          <IoRemove />
        </button>
        <div className="flex items-center justify-end w-6 h-6">
          <span className="leading-none align-middle">{item.frequency}</span>
        </div>
        <button
          className="flex items-center justify-center w-6 h-6 ml-2 border border-transparent rounded-full cursor-pointer hover:border-slate-200 active:border-slate-300"
          onClick={() => {
            onIncrementClicked(item.content);
          }}
        >
          <IoAdd />
        </button>
      </div>
      <div
        onClick={() => {
          onRemoveClicked(item.content);
        }}
        className={`${
          isHovered ? "flex" : "hidden"
        } justify-self-end text-slate-400 cursor-pointer justify-center items-center text-center text-lg w-6 h-6`}
      >
        <span className="select-none hover:text-slate-500">
          <IoTrash />
        </span>
      </div>
    </div>
  );
});

CandidateListItem.displayName = "CandidateListItem";
export default CandidateListItem;
