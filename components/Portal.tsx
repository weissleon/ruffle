import { ReactNode, useEffect, useState, VFC } from "react";
import { createPortal } from "react-dom";

type Props = {
  children?: ReactNode;
};
const Portal: VFC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#portal")!)
    : null;
};

export default Portal;
