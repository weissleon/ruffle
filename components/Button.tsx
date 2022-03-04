import React, { MouseEvent, ReactNode, useMemo, VFC } from "react";
import { motion, Variants } from "framer-motion";

type BaseProps = {
  size?: "md" | "large";
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  gradient?: boolean;
};

type Props = BaseProps &
  ({ component?: "label"; htmlFor?: string } | { component?: "button" });
const Button: VFC<Props> = (props) => {
  const {
    children = null,
    component = "button",
    disabled = false,
    fullWidth = false,
    gradient = false,
    onClick = () => {},
    size = "md",
  } = props;
  let htmlFor = props.component === "label" ? props.htmlFor : undefined;

  const buttonVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: { opacity: 1 },
      hover: { scale: disabled ? 1 : 1.01 },
      tap: { scale: disabled ? 1 : 0.99 },
    }),
    [disabled]
  );

  const Element = component === "label" ? motion.label : motion.button;

  return (
    <Element
      className={`flex h-9 items-center justify-center px-4 disabled:from-slate-200 disabled:to-gray-200 ${
        size === "md" ? "py-2" : "py-6"
      } cursor-pointer rounded-md font-bold text-white ${
        gradient
          ? "gap-x-3 bg-gradient-to-r from-blue-400 to-purple-400"
          : "bg-white text-slate-600 outline outline-1 outline-slate-300"
      } ${fullWidth && "w-full"} ${disabled && "cursor-not-allowed"}`}
      variants={buttonVariants}
      initial="hidden"
      animate="show"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled}
      htmlFor={htmlFor}
    >
      {children}
    </Element>
  );
};

export default Button;
