import { useState, VFC } from "react";

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
const CandidateListItem: VFC<Props> = ({
  item,
  onDecrementClicked,
  onIncrementClicked,
  onRemoveClicked,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function handleOnHover() {
    setIsHovered(true);
  }

  function handleOnHoverLeave() {
    setIsHovered(false);
  }

  return (
    <div
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnHoverLeave}
      className="w-full grid grid-cols-3 grid-flow-col items-start px-4 "
      key={item.content}
    >
      <div className="justify-self-start w-full break-words">
        {item.content}
      </div>
      <div className="justify-self-center w-full flex flex-row gap-2 items-center">
        <input
          className="cursor-pointer border border-transparent rounded-full hover:border-slate-200 active:border-slate-300 w-6 h-6"
          type="button"
          value="-"
          onClick={() => {
            onDecrementClicked(item.content);
          }}
        />
        <div>
          <span className="align-middle">{item.frequency}</span>
        </div>
        <input
          className="cursor-pointer border border-transparent rounded-full hover:border-slate-200 active:border-slate-300 w-6 h-6"
          type="button"
          value="+"
          onClick={() => {
            onIncrementClicked(item.content);
          }}
        />
      </div>
      <div
        onClick={() => {
          onRemoveClicked(item.content);
        }}
        className={`${
          isHovered ? "flex" : "hidden"
        } bg-red-500 justify-self-end text-white cursor-pointer justify-center items-center text-center shadow-sm text-xs rounded-full w-6 h-6`}
      >
        <span>X</span>
      </div>
    </div>
  );
};

export default CandidateListItem;
