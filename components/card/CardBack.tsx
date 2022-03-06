import React, { forwardRef, useCallback, useEffect, useRef, VFC } from "react";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import GlowingFrame from "./GlowingFrame";
type Props = {};

const CardBack = (props: Props) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(SVGSVGElement | null)[]>([]);
  const controlsRef = useRef([useAnimation(), useAnimation(), useAnimation()]);

  function randomDest(min: number, max: number) {
    return (
      Math.floor(Math.random() * (Math.abs(min) + max)) - Math.abs(min) + 1
    );
  }

  const move = useCallback(
    async (
      control: AnimationControls,
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ) => {
      const duration = 8;

      while (true) {
        const xDest = randomDest(minX, maxX);
        const yDest = randomDest(minY, maxY);

        await control.start({
          x: xDest,
          y: yDest,
          transition: { ease: "linear", duration: duration },
        });
      }
    },
    []
  );

  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    const { clientWidth: width, clientHeight: height } = cardContainer!;
    const controls = controlsRef.current;

    controls.forEach((control, index) => {
      const { clientWidth: cw, clientHeight: ch } = circlesRef.current[index]!;
      const randX = randomDest(-cw, width);
      const randY = randomDest(-ch, height);

      control.set({ x: randX, y: randY });
      move(control, -cw, -cw, width, height);
    });

    return () => {};
  }, [move]);

  return (
    <div
      ref={cardContainerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <span
        className="absolute z-[11] bg-yellow-300 bg-clip-text text-6xl font-bold text-transparent"
        style={{
          textShadow: "0px 0px 2px #fef9c388",
        }}
      >
        R
      </span>

      <div className="absolute z-[12] h-full w-full">
        <GlowingFrame />
      </div>

      <div className="absolute inset-0">
        <div className="absolute h-full w-full bg-blue-400" />
        <div className="blur-[40px]">
          <Circle
            ref={(ref) => (circlesRef.current[0] = ref)}
            control={controlsRef.current[0]}
            color="#c084fc"
          />
          <Circle
            ref={(ref) => (circlesRef.current[1] = ref)}
            control={controlsRef.current[1]}
            color="#60a5fa"
          />
          <Circle
            ref={(ref) => (circlesRef.current[2] = ref)}
            control={controlsRef.current[2]}
            color="#c084fc"
          />
        </div>
      </div>
    </div>
  );
};

export default CardBack;

type CircleProps = {
  color?: string;
  control?: AnimationControls;
};
const Circle = forwardRef<SVGSVGElement, CircleProps>((props, ref) => {
  const { color = "black", control = null } = props;

  return (
    <motion.svg
      ref={ref}
      animate={control || undefined}
      className="absolute w-[500px]"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="f1">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
      <circle fill={color} cx={50} cy={50} r={40} filter="url(#f1)" />
    </motion.svg>
  );
});

Circle.displayName = "Circle";
