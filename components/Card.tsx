import React, { MouseEvent, useState, VFC } from "react";
import {
  motion,
  animate,
  useTransform,
  useMotionValue,
  Variants,
} from "framer-motion";
import CardBack from "./card/CardBack";
type Props = {
  content?: string;
  isAnimating?: boolean;
  onClick?: () => void;
};

function shakeFunction(input: number) {
  return 0.04 * input * input * Math.sin(Math.pow(Math.PI * input, 2));
}

const cardOverlayVariants: Variants = {
  idle: { opacity: 0, background: "#fde047" },
  shine: {
    opacity: 1,
    background: "#ffffff",
    transition: {
      opacity: {
        duration: 2,
      },
      duration: 3,
    },
  },
};

const cardVariants: Variants = {
  idle: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, type: "spring", bounce: 0.5 },
  },
  shine: { opacity: 0, scale: 1.5, transition: { duration: 3 } },
};

const Card: VFC<Props> = ({
  content = "",
  onClick = () => {},
  isAnimating = false,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  // const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // const shakeInput = useMotionValue(1);
  // const transformInput = useMotionValue(1);
  // const overlayOpacity = useMotionValue(0);
  // const contentOpacity = useMotionValue(0);
  // const scale = useTransform(
  //   transformInput,
  //   (input2) => 0.005 * (input2 - 1) + 1
  // );
  // const shake = useTransform(shakeInput, (input) => shakeFunction(input));
  // const raise = useTransform(transformInput, (input2) => -0 * (input2 - 1));

  function handleOnCardClick(event: MouseEvent<HTMLDivElement>) {
    onClick();
    // setIsAnimating(true);
    // animate(shakeInput, 5, {
    //   restSpeed: 0.0001,
    //   duration: 1,
    //   repeatType: "mirror",
    //   repeat: 1,
    //   onComplete: () => {
    //     shakeInput.set(1);
    //   },
    // });
    // animate(transformInput, 10, {
    //   ease: "easeOut",
    //   restSpeed: 0.0001,
    //   duration: 2,
    //   onComplete: () => {
    //     animate(transformInput, 1, {
    //       duration: 0.3,
    //       ease: "easeOut",
    //     });
    //     animate(contentOpacity, 1, {
    //       delay: 0.5,
    //       duration: 1.5,
    //       ease: "easeOut",
    //       onComplete: () => {
    //         setIsFlipped(true);
    //         setIsAnimating(false);
    //       },
    //     });
    //   },
    // });
    // animate(overlayOpacity, 1, {
    //   ease: "easeOut",
    //   restSpeed: 0.0001,
    //   duration: 2,
    // });
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="shine"
      animate={!isAnimating ? "idle" : "shine"}
      onClick={!isFlipped ? handleOnCardClick : undefined}
      className="relative flex h-80 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-md shadow-md"
      whileHover={!isAnimating ? { scale: 1.02 } : {}}
      // style={{
      //   backfaceVisibility: "hidden",
      //   translateX: shake,
      //   scale: scale,
      //   translateY: raise,
      // }}
    >
      <motion.div
        variants={cardOverlayVariants}
        initial="idle"
        animate={!isAnimating ? "idle" : "shine"}
        className="absolute z-20 h-full w-full "
        // style={{ opacity: overlayOpacity }}
      />
      <CardBack />
      {/* <motion.div
        className="white absolute z-30 flex h-full w-full select-none items-center justify-center"
        style={{
          opacity: contentOpacity,
        }}
      >
        {content}
      </motion.div> */}
    </motion.div>
  );
};

export default Card;
