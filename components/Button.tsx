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
      hover: { y: 0, scale: disabled ? 1 : 1.01 },
      tap: { y: 0, scale: disabled ? 1 : 0.99 },
    }),
    [disabled]
  );

  const Element = component === "label" ? motion.label : motion.button;

  return (
    <Element
      className={`disabled:from-slate-200 disabled:to-gray-200 flex items-center justify-center px-4 ${
        size === "md" ? "py-2" : " py-4"
      } font-bold text-white rounded-md cursor-pointer ${
        gradient
          ? "bg-gradient-to-r from-blue-400 gap-x-3 to-purple-400"
          : "bg-white outline outline-1 text-slate-600 outline-slate-300"
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
