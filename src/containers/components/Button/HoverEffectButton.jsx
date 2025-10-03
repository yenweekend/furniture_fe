import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
const HoverEffectButton = ({ className, children, url }) => {
  return (
    <Link
      to={url}
      className={cn(
        "text-[14px] overflow-hidden btn-hover-effect cursor-pointer text-center",
        className
      )}
    >
      Xem tất cả {children}
    </Link>
  );
};

export default HoverEffectButton;
