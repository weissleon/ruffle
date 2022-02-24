import React, { VFC } from "react";

import { motion, Variants } from "framer-motion";
import {
  IoAmericanFootballOutline,
  IoBusOutline,
  IoBasketballOutline,
  IoBeerOutline,
  IoDiceOutline,
  IoHeartOutline,
  IoPizzaOutline,
  IoCardOutline,
} from "react-icons/io5";
type Props = {};

const iconList = [
  IoAmericanFootballOutline,
  IoBusOutline,
  IoBasketballOutline,
  IoBeerOutline,
  IoDiceOutline,
  IoHeartOutline,
  IoPizzaOutline,
  IoCardOutline,
];

const sizes = [12, 16, 20];
const colors = ["purple", "blue"];

type IconProps = {
  iconIndex: number;
  duration: number;
  sizeIndex: number;
  colorIndex: number;
  delay: number;
  repeatDelay: number;
};

const AnimatingBackgroundVariants: Variants = {
  exit: {
    opacity: 0,
  },
};

function generateIconSettings() {
  const iconSettings: IconProps[] = [];

  for (let i = 0; i < 16; i++) {
    const iconIndex = Math.floor(Math.random() * iconList.length);
    const duration = Math.floor(Math.random() * 2) + 2;
    const sizeIndex = Math.floor(Math.random() * 3);
    const delay = Math.ceil(Math.random() * 3) - 0.5;
    const repeatDelay = Math.floor(Math.random() * 3) + 2;
    const colorIndex = Math.floor(Math.random() * 2);

    const iconProp: IconProps = {
      iconIndex,
      duration,
      sizeIndex,
      delay,
      repeatDelay,
      colorIndex,
    };

    iconSettings.push(iconProp);
  }

  return iconSettings;
}

const AnimatingBackground: VFC<Props> = ({}) => {
  const iconSettings: IconProps[] = generateIconSettings();

  return (
    <motion.div
      variants={AnimatingBackgroundVariants}
      exit={"exit"}
      className="absolute inset-0 overflow-hidden -z-10"
    >
      {iconSettings.map((iconProps, index) => {
        const {
          iconIndex,
          duration,
          sizeIndex,
          delay,
          repeatDelay,
          colorIndex,
        } = iconProps;

        const Icon = iconList[iconIndex];
        const size = sizes[sizeIndex];
        const color = colors[colorIndex];
        return (
          <motion.div
            key={index}
            className={`absolute w-${size} h-${size}`}
            initial={{
              x: `${Math.floor(Math.random() * 100)}vw`,
              y: `${Math.floor(Math.random() * 100)}vh`,
              scale: 0,
              rotate: -180,
              opacity: 0,
            }}
            animate={{ scale: 1, rotate: 0, opacity: [null, 1, 0] }}
            transition={{
              duration: duration,
              delay: delay,
              repeatDelay: repeatDelay,
              ease: "easeOut",
              repeat: Infinity,
            }}
          >
            <Icon
              className={`w-full h-full ${
                color === "blue"
                  ? "stroke-blue-400 fill-blue-400"
                  : "stroke-purple-400 fill-purple-400"
              }`}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AnimatingBackground;
