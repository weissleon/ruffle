import React, { useEffect, useRef, VFC } from "react";
import { motion, useMotionValue } from "framer-motion";
import gsap from "gsap";
type Props = {};

const GlowingFrame: VFC<Props> = () => {
  return <Frame />;
};

export default GlowingFrame;

type FrameProps = {
  intensity?: number;
};
const Frame: VFC<FrameProps> = () => {
  const gaussianBlurRef = useRef(null);

  useEffect(() => {
    gsap.to(gaussianBlurRef.current, {
      attr: { stdDeviation: 3 },
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "power1.inOut",
    });

    return () => {};
  }, []);

  return (
    <motion.svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 208 320"
    >
      <g>
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur
              ref={gaussianBlurRef}
              result="coloredBlur"
              stdDeviation={4}
            ></feGaussianBlur>

            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>

        <path
          fill="url(#gradient)"
          d="M185.13,306H22.87c-4.89,0-8.87-3.98-8.87-8.87V22.87c0-4.89,3.98-8.87,8.87-8.87h162.26
		c4.89,0,8.87,3.98,8.87,8.87v274.26C194,302.02,190.02,306,185.13,306z M22.87,16C19.08,16,16,19.08,16,22.87v274.26
		c0,3.79,3.08,6.87,6.87,6.87h162.26c3.79,0,6.87-3.08,6.87-6.87V22.87c0-3.79-3.08-6.87-6.87-6.87H22.87z"
          filter="url(#glow)"
        />
      </g>
    </motion.svg>
  );
};
