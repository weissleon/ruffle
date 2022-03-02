import Portal from "@components/Portal";
import React from "react";

type Props = {};

const Test = (props: Props) => {
  return (
    <main>
      <Portal>
        <div className="absolute inset-0 z-20 backdrop-blur-sm ">
          Your modal content
        </div>
      </Portal>

      <button className="bg-green-400" onClick={() => {}}>
        Open modal
      </button>
    </main>
  );
};

export default Test;
