import React from "react";
import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import formatPrice from "@/helpers/formatPrice";
const ProductCardNi = ({ className, productData = null }) => {
  return productData ? (
    <div
      className={cn(
        "flex items-start [&:last-child]:border-b-transparent border-b pb-[6px] border-solid border-b-[#eae4e8] ",
        className
      )}
    >
      <Link
        to={productData.url}
        className="w-[100px] overflow-hidden flex-none block p-[10px]"
      >
        <div className="w-full pb-[100%] relative ">
          <div className="absolute inset-0">
            <LazyLoadImage
              src={productData.thumbnail}
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Link>
      <div className="flex-auto p-[10px]">
        <div className="flex items-center w-full">
          <Link
            to={productData.url}
            className="flex-auto w-0 text-[13px] md:text-[14px] line-clamp-2 mb-[5px] "
          >
            {productData.title}
          </Link>
        </div>
        <div className="">
          <span className=" text-[12px] md:text-[13px] price  font-bold text-redni">
            {formatPrice(productData.price)}
          </span>
          <span className=" text-[12px] md:text-[13px] price-delete ml-[10px] text-[#878c8f] line-through font-light relative">
            {formatPrice(productData.price_original)}
          </span>
          <span className="text-redni border-solid border border-[#f0e8ee] rounded-[3px] px-[4px] py-[1px] text-[10px] font-semibold text-center bg-[#fbf1f1] ml-[10px]">
            -30%
          </span>
        </div>
      </div>
    </div>
  ) : (
    "ON GOING"
  );
};

export default ProductCardNi;
