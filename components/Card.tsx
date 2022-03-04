import React, { MouseEvent, useState, VFC } from "react";
import { motion, animate, useTransform, useMotionValue } from "framer-motion";
type Props = {
  content: string;
};

function shakeFunction(input: number) {
  return 0.04 * input * input * Math.sin(Math.pow(Math.PI * input, 2));
}

const Card: VFC<Props> = ({ content }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const shakeInput = useMotionValue(1);
  const transformInput = useMotionValue(1);
  const overlayOpacity = useMotionValue(0);
  const contentOpacity = useMotionValue(0);
  const scale = useTransform(
    transformInput,
    (input2) => 0.005 * (input2 - 1) + 1
  );
  const shake = useTransform(shakeInput, (input) => shakeFunction(input));
  const raise = useTransform(transformInput, (input2) => -0 * (input2 - 1));

  function handleOnCardClick(event: MouseEvent<HTMLDivElement>) {
    setIsAnimating(true);
    animate(shakeInput, 5, {
      restSpeed: 0.0001,
      duration: 1,
      repeatType: "mirror",
      repeat: 1,
      onComplete: () => {
        shakeInput.set(1);
      },
    });

    animate(transformInput, 10, {
      ease: "easeOut",
      restSpeed: 0.0001,
      duration: 2,
      onComplete: () => {
        setIsFlipped(true);
        animate(transformInput, 1, {
          duration: 0.3,
          ease: "easeOut",
        });
        animate(contentOpacity, 1, {
          delay: 0.5,
          duration: 1.5,
          ease: "easeOut",
          onComplete: () => {
            setIsAnimating(false);
          },
        });
      },
    });

    animate(overlayOpacity, 1, {
      ease: "easeOut",
      restSpeed: 0.0001,
      duration: 2,
    });
  }

  return (
    <motion.div
      onClick={!isFlipped ? handleOnCardClick : undefined}
      className="relative flex h-80 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-md"
      whileHover={{ scale: isAnimating ? undefined : 1.02 }}
      style={{
        translateX: shake,
        scale: scale,
        translateY: raise,
      }}
    >
      <motion.div
        className="absolute h-full w-full bg-white"
        style={{ opacity: overlayOpacity }}
      ></motion.div>
      <motion.div className="flex h-full w-full items-center justify-center bg-blue-300"></motion.div>
      <motion.div
        className="absolute z-10 flex h-full w-full select-none items-center justify-center bg-red-400"
        style={{
          opacity: contentOpacity,
        }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
};

export default Card;
