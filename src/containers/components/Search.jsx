import React from "react";
import { cn } from "@/lib/utils";
import {
  CircleAlert,
  History,
  Search as SearchIcon,
  TrendingUp,
  X,
} from "lucide-react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Search = ({ className }) => {
  //TODO SEARCH

  return (
    <form
      className={cn(
        "h-10 relative bg-[#fff] pr-[4px]  2md:min-w-[400px] flex-auto group",
        className
      )}
    >
      <input
        placeholder="Tìm kiếm sản phẩm"
        className="pl-4 top-[50%] translate-y-[-50%] absolute w-full pr-[80px] leading-[1.5715] text-[14px] monserat_font peer"
      ></input>
      <div className="bg-redichi absolute right-[2px] top-[2px] bottom-[2px]  cursor-pointer px-3 flex items-center justify-center w-[70px] ">
        <SearchIcon className="text-[#fff]" width={20} height={20} />
      </div>
      <div
        className={`absolute  shadow-nd bg-[#fff] left-0 right-0 px-[20px] z-[99]   transition-all ease-linear duration-150 ${
          open
            ? " opacity-100  visible  top-[102%] "
            : "top-[120%] opacity-0 invisible"
        }`}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className="border-b border-solid border-shop  py-[10px]">
          <div className="flex items-center">
            <SearchIcon className="text-blackshop" width={12} height={12} />
            <span className="text-[13px] pl-3">Từ khóa tìm kiếm:</span>
            <span className="text-[13px] pl-2 text-redichi font-bold">
              Keyword
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Search;
