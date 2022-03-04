import React, { VFC, useState, useEffect, useRef, useCallback } from "react";
import lottie, { AnimationItem } from "lottie-web";
import data from "../../public/loading.json";

type Props = {
  isLoading?: boolean;
};

const LoadingAnimation: VFC<Props> = ({ isLoading = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationItemRef = useRef<AnimationItem>();

  const onLoopComplete = useCallback(
    (animation: AnimationItem) => {
      return () => {
        if (!isLoading) {
          animation.setSegment(59, 180);
          animation.loop = false;
        }
      };
    },
    [isLoading]
  );

  useEffect(() => {
    if (containerRef.current === null) return;
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: data,
    });

    animationItemRef.current = animation;
    animation.setSegment(0, 58);

    return () => {
      animation.destroy();
    };
  }, []);

  useEffect(() => {
    const animation = animationItemRef.current;
    if (animation === undefined) return;

    animation.addEventListener("loopComplete", onLoopComplete(animation));
    return () => {
      // animation.removeEventListener("loopComplete", onLoopComplete(animation));
    };
  }, [onLoopComplete]);

  return <div className="h-full w-full" ref={containerRef} />;
};

export default LoadingAnimation;
