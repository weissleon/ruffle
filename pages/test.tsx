import React, { useEffect } from "react";
import { useRuffleData } from "../hooks/RuffleDataContext";

const Test = () => {
  const { ruffleData, setRuffleData } = useRuffleData()!;

  useEffect(() => {
    console.log(ruffleData);

    return () => {};
  }, [ruffleData]);

  function onClick() {
    const freq = ruffleData.itemMap.get("Denis Cho");
    setRuffleData((draft) => {
      draft.itemMap.set("Denis Cho", freq ? freq + 1 : 1);
    });
  }

  return (
    <div>
      <button onClick={onClick}>Add Candidate</button>
    </div>
  );
};

export default Test;
