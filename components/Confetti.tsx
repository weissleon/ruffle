import React, { useEffect, useRef } from "react";
import confetti, { Options, GlobalOptions } from "canvas-confetti";

type Props = {};

const globalOptions: GlobalOptions = {
  resize: true,
  useWorker: true,
};

const Confetti = (props: Props) => {
  const containerRef = useRef<HTMLCanvasElement>(null);

  function launchConfetti(instance: confetti.CreateTypes) {
    if (!instance) return;

    const randX = Math.random() * 0.7 + 0.3;
    const randY = Math.random() - 0.2;

    const options: Options = {
      particleCount: 120,
      startVelocity: 20,
      spread: 1000,
      colors: ["#c084fc", "#60a5fa"],
      origin: {
        x: randX,
        y: randY,
      },
    };

    instance(options);
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const confettiInstance = confetti.create(
      containerRef.current,
      globalOptions
    );

    const intervalId = setInterval(() => launchConfetti(confettiInstance), 500);
    return () => {
      confetti.reset();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas
      className="absolute -z-10 h-full w-full"
      ref={containerRef}
      id="confetti-container"
    />
  );
};

export default Confetti;
