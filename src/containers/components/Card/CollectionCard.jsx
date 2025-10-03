import React from "react";
import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
const CollectionCard = ({ className, collectionData = null }) => {
  return collectionData ? (
    <div className={cn("w-full relative  ", className)}>
      <Link
        className="w-full overflow-hidden rounded-t-[6px] block"
        to={collectionData.url}
      >
        <LazyLoadImage
          src={collectionData.thumbnail}
          effect="opacity"
          className="hover:scale-110 transition-all ease-linear duration-300 cursor-pointer"
        />
      </Link>
      <div className="py-[10px] px-5 absolute bottom-0 right-0 left-0 flex flex-col items-center">
        <Link
          to={collectionData.url}
          className="cursor-pointer text-redichi font-bold text-[16px] text-center"
        >
          {collectionData.title}
        </Link>
        <a
          to={collectionData.url}
          className="text-vendor text-[13px] cursor-pointer hover:text-redichi transition-all ease-linear duration-150"
        >
          Xem ngay
        </a>
      </div>
    </div>
  ) : (
    "Error"
  );
};

export default CollectionCard;
