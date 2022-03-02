import React, { MouseEvent, VFC } from "react";

type Props = {
  onClick?: (event: MouseEvent) => void;
};

const Overlay: VFC<Props> = ({ onClick = () => {} }) => {
  return (
    <div className="fixed z-[60] inset-0 backdrop-blur-sm" onClick={onClick} />
  );
};

export default Overlay;
