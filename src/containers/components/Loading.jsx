"use client";

import { motion } from "motion/react";

function LoadingThreeDotsJumping() {
  const dotVariants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center gap-10">
        <span className="text-redichi text-[32px] font-bold whitespace-nowrap ">
          Vui Lòng chờ
        </span>
        <motion.div
          animate="jump"
          transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
          className="container"
        >
          <motion.div className="dot" variants={dotVariants} />
          <motion.div className="dot" variants={dotVariants} />
          <motion.div className="dot" variants={dotVariants} />
          <StyleSheet />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: var(--shop-color-main);
                will-change: transform;
            }
            `}
    </style>
  );
}

export default LoadingThreeDotsJumping;
