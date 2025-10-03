import React from "react";
import { cn } from "@/lib/utils";
const CloseButton = ({ className }) => {
  return (
    <div
      className={cn(
        "btn-close relative cursor-pointer text-[#272727] w-9 h-9 border-[9px] border-solid border-transparent hover:bg-[#e5e5e5] rounded-full",
        className
      )}
    ></div>
  );
};

export default CloseButton;
