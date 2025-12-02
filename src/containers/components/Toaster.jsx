"use client";

import React from "react";
import { toast as sonnerToast } from "sonner";
import { X } from "lucide-react";
import formatPrice from "@/helpers/formatPrice";
/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
function toast(toast) {
  // parent
  return sonnerToast.custom((id) => (
    <Toast id={id} title={toast.title} data={toast.data} />
  ));
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props) {
  // child
  const { title, id, data } = props;
  return (
    <div className="flex rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4 min-w-[360px]">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <div className=" font-medium flex items-center justify-between">
            <h3 className="text-redichi text-[13px]">{title}</h3>
            <button
              className="h-6 w-6 rounded-full bg-redichi text-[#fff] flex items-center justify-center cursor-pointer p-1"
              onClick={() => {
                sonnerToast.dismiss(id);
              }}
            >
              <X stroke="#fff" size={14} />
            </button>
          </div>
          <div className="mt-1 flex items-start gap-3">
            <div className="w-[60px] h-[60px] overflow-hidden border border-solid border-[#f4f4f4] flex-shrink-0">
              <img
                src={
                  data.thumbnail ||
                  `https://product.hstatic.net/200000796751/product/2002535_5b3eede60829490499619fabe5dbd0a9_large.jpg`
                }
                alt=""
              />
            </div>
            <div className="">
              <p className="text-[12px] text-blackni line-clamp-2">
                {data.title}
              </p>
              <span className="text-[12px] text-redichi">
                {formatPrice(data.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default toast;
