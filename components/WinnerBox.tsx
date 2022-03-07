import React, {
  Children,
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  VFC,
} from "react";
import { motion, Variants } from "framer-motion";
import { useResizeObserver, useViewportSize } from "@mantine/hooks";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

type Props = {
  list: string[];
  variants?: Variants;
  onRestartClicked?: () => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
    },
  },
  exit: {},
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: {},
};

const buttonVariants: Variants = {
  hidden: { scale: 1, opacity: 0 },
  show: { scale: 1, opacity: 1 },
  hover: { scale: 1.05 },
  exit: { opacity: 0 },
};

const WinnerBox: VFC<Props> = ({
  list,
  variants = {},
  onRestartClicked = () => {},
}) => {
  if (!list) throw new Error("List is not provided into WinnerBox!");

  const [index, setIndex] = useState<number>(0);
  const [innerContainerRef, innerRect] = useResizeObserver();
  const { width: vWidth, height: vHeight } = useViewportSize();

  const mainRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { width: containerW, height: containerH } = innerRect;
  const colCount = Math.floor((containerW - 32) / (10 * 16));
  const rowCount = Math.floor((containerH - 32) / (3 * 16));

  const size = colCount * rowCount;
  const visibleList = list.slice(index * size, (index + 1) * size);

  function onNextClicked() {
    if (index >= Math.ceil(list.length / size) - 1) return;
    setIndex((prev) => prev + 1);
  }

  function onBeforeClicked() {
    if (index <= 0) return;
    setIndex((prev) => prev - 1);
  }

  useEffect(() => {
    if (index > Math.ceil(list.length / size) - 1)
      setIndex(Math.ceil(list.length / size) - 1);
  }, [vWidth]);

  useLayoutEffect(() => {
    const offset = mainRef.current?.getBoundingClientRect().bottom;
    const margin = 16;
    buttonRef.current?.setAttribute("style", `top:${offset! + margin}px`);
    return () => {};
  }, [vWidth, vHeight]);

  return (
    <motion.div
      variants={containerVariants}
      className="relative z-[110] flex h-full w-full items-center justify-center gap-x-8"
    >
      {vWidth >= 460 ? (
        <Button
          onClick={onBeforeClicked}
          disabled={index <= 0}
          direction="left"
        />
      ) : null}

      {vWidth < 460 ? (
        <motion.div className="absolute top-4 flex gap-x-16">
          <Button
            onClick={onBeforeClicked}
            disabled={index <= 0}
            direction="left"
          />
          <Button
            onClick={onNextClicked}
            disabled={index >= Math.ceil(list.length / size) - 1}
            direction="right"
          />
        </motion.div>
      ) : null}
      <motion.div
        ref={mainRef}
        className="relative grid h-[clamp(14rem,80%,50rem)] w-[clamp(16rem,40%,40rem)] grid-rows-[min-content_minmax(5rem,1fr)] flex-wrap items-start gap-y-8 overflow-hidden rounded-xl p-8 shadow-lg"
        variants={variants}
      >
        <motion.div className="absolute -z-10 h-4 w-full bg-gradient-to-r from-blue-300 to-purple-300" />
        <motion.div className="absolute bottom-0 -z-10 h-4 w-full bg-gradient-to-r from-blue-300 to-purple-300" />
        {/* Background */}
        <motion.div className="absolute inset-0 -z-50 bg-white" />

        <h1 className="relative mx-auto bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-4xl font-extrabold text-transparent">
          축하합니다!
        </h1>

        <motion.div
          ref={innerContainerRef}
          className="relative h-full w-full shadow-md"
          variants={listVariants}
        >
          <motion.div
            className={`relative flex ${
              index > 0 && colCount !== 1 ? "items-start" : "items-center"
            } h-full w-full flex-col flex-wrap  overflow-hidden p-4`}
          >
            {visibleList.map((winner, index) => (
              <Item key={`${winner},${index}`} winner={winner} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      {vWidth >= 460 ? (
        <Button
          onClick={onNextClicked}
          disabled={index >= Math.ceil(list.length / size) - 1}
          direction="right"
        />
      ) : null}

      <motion.button
        onClick={onRestartClicked}
        variants={buttonVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        whileHover="hover"
        ref={buttonRef}
        className="absolute w-52 rounded-lg border bg-white bg-gradient-to-r from-teal-300 to-blue-400 px-4 py-2"
      >
        <span className=" bg-clip-text text-lg font-semibold text-white">
          다시 시작하기
        </span>
      </motion.button>
    </motion.div>
  );
};

export default WinnerBox;

type ItemProps = {
  winner: string;
  variants?: Variants;
};

const wordLimit = 16;

const Item: VFC<ItemProps> = ({ winner, variants = {} }) => {
  if (winner.length > wordLimit) winner = `${winner.slice(0, wordLimit)}...`;

  return (
    <motion.div className="flex h-[3rem] w-[10rem] items-center rounded-md font-semibold text-slate-500 ">
      {winner}
    </motion.div>
  );
};

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;

  direction?: "right" | "left";
};

const Button: VFC<ButtonProps> = ({
  onClick,
  disabled = false,
  direction = "left",
}) => {
  const activeVariants: Variants = {
    idle: { color: "rgba(75 85 99 255)", background: "rgba(255 255 255 0)" },
    hover: {
      color: "rgba(255 255 255 255)",
      background:
        direction === "left"
          ? "rgba(147 197 253 255)"
          : "rgba(216 180 254 255)",
    },
  };

  const inactiveVariants: Variants = {
    idle: { color: "rgba(229 231 235 255)", background: "rgba(255 255 255 0)" },
    hover: {
      color: "rgba(229 231 235 255)",
      background: "rgba(255 255 255 0)",
    },
  };

  const variants = disabled ? inactiveVariants : activeVariants;
  return (
    <motion.button
      variants={variants}
      onClick={onClick}
      className={`rounded-full p-4 ${disabled ? "cursor-not-allowed" : ""}`}
      whileHover={"hover"}
      animate="idle"
      initial={"idle"}
    >
      {direction === "left" ? <IoChevronBack /> : null}
      {direction === "right" ? <IoChevronForward /> : null}
    </motion.button>
  );
};
