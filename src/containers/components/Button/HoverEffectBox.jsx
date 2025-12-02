import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
const HoverEffectButton = ({ className, children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "text-[14px] overflow-hidden btn-hover-effect cursor-pointer  ",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default HoverEffectButton;
