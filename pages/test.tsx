import WinnerBox from "@components/WinnerBox";
import React, { VFC } from "react";
type Props = {};

const winners = [
  "Denis Cho",
  "Dana Cho",
  "Esther Kim",
  "Grace Yeon",
  "Klaus Cho",
  "I am from China, and I believe Taiwan is a country",
];

const Test: VFC<Props> = ({}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <WinnerBox list={[...winners, ...winners, ...winners]} />
    </div>
  );
};

export default Test;
