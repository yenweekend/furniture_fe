import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import * as HoverCardFull from "@radix-ui/react-hover-card";
import { message, Popover } from "antd";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CircleAlert, Copy } from "lucide-react";
import moment from "moment";
import formatPrice from "@/helpers/formatPrice";
export function CouponContentButton({ data }) {
  const [copied, setCopied] = React.useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (code) => {
    if (!copied) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopied(true);
          messageApi.open({
            type: "success",
            content: "Mã giảm giá đã được sao chép!",
            className: "custom-class",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          });
        })
        .catch(() => {
          messageApi.open({
            type: "error",
            content: "Không thể sao chép mã giảm giá, vui lòng thử lại.",
            className: "custom-class",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          });
        });
    }
  };
  const [open, onOpenChange] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 990px)");
  if (isDesktop) {
    return (
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        content={
          <>
            <div className="px-8 py-3 bg-[#fafafa] flex items-center">
              <span className="text-vendor uppercase text-[12px] basis-1/3">
                Mã
              </span>
              <div className="flex-auto basis-2/3 flex items-center gap-2 pl-[20px]">
                <span className="text-[13px] font-bold text-coupontext uppercase">
                  {data?.code}{" "}
                </span>
                <button className="w-6 h-6 rounded-full  bg-[#4ea8cd] bg-opacity-20 flex items-center justify-center">
                  <Copy
                    className="stroke-[#4ea8cd]"
                    size={12}
                    strokeWidth={1.4}
                  />
                </button>
              </div>
            </div>
            <div className="px-8 py-3 flex items-center">
              <span className="text-vendor font-medium text-[12px] basis-1/3">
                Hạn sử dụng
              </span>
              <span className="text-coupontext uppercase text-[13px] basis-2/3 font-medium pl-[20px]">
                {moment(data?.expire_date).format("DD/MM/YYYY")}{" "}
              </span>
            </div>
            <div className="px-8 py-3 bg-[#fafafa] flex items-center">
              <ul className="  list-outside ">
                <li className="text-[13px] list-disc marker:text-[#000] text-coupontext font-normal  relative ">
                  Dành cho đơn hàng từ {formatPrice(data?.condition)}
                </li>
                <li className="text-[13px] list-disc marker:text-[#000] text-coupontext font-normal  relative ">
                  Mã khách hàng được sử dụng tối đa 1 lần
                </li>
                <li className="text-[13px] list-disc marker:text-[#000] text-coupontext font-normal  relative ">
                  Sao chép mã và nhập mã khuyến mãi ở trang thanh toán
                </li>
              </ul>
            </div>
          </>
        }
        trigger="hover"
      >
        <button className={"absolute right-0 top-0 cursor-pointer"}>
          <CircleAlert
            size={20}
            className="stroke-coupontext"
            strokeWidth={1.6}
          />
        </button>
      </Popover>
    );
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {contextHolder}

      <DrawerTrigger asChild className="cursor-pointer text-[#fff] py-2 pl-4">
        <button className={"absolute right-0 top-0 cursor-pointer"}>
          <CircleAlert
            size={20}
            className="stroke-coupontext"
            strokeWidth={1.6}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left rounded-t-[10px] ">
          <DrawerTitle className={"text-center text-[20px] font-bold "}>
            Giảm 200k
          </DrawerTitle>
          <DrawerDescription className={"hidden"}>
            Thông tin coupon
          </DrawerDescription>
        </DrawerHeader>
        <div className="">
          <div className="px-8 py-3 bg-[#fafafa] flex items-center">
            <span className="text-vendor uppercase text-[12px] basis-1/3">
              Mã
            </span>
            <div className="flex-auto basis-2/3 flex items-center gap-2 pl-[20px]">
              <span className="text-[13px] font-bold text-coupontext uppercase">
                vouchert1-200k
              </span>
              <button className="w-6 h-6 rounded-full  bg-[#4ea8cd] bg-opacity-20 flex items-center justify-center">
                <Copy
                  className="stroke-[#4ea8cd]"
                  size={12}
                  strokeWidth={1.4}
                />
              </button>
            </div>
          </div>
          <div className="px-8 py-3 flex items-center">
            <span className="text-vendor font-medium text-[12px] basis-1/3">
              Hạn sử dụng
            </span>
            <span className="text-coupontext uppercase text-[13px] basis-2/3 font-medium pl-[20px]">
              31/12/2025
            </span>
          </div>
          <div className="px-8 py-3 bg-[#fafafa] flex items-center">
            <ul className="  list-outside ">
              <li className="text-[13px] list-disc marker:text-[#000] text-coupontext font-normal  relative ">
                Dành cho đơn hàng từ 400k
              </li>
              <li className="text-[13px] list-disc marker:text-[#000] text-coupontext font-normal  relative ">
                Mã khách hàng được sử dụng tối đa 1 lần
              </li>
              <li className="text-[13px] list-disc marker:text-[#000] text-coupontext font-normal  relative ">
                Sao chép mã và nhập mã khuyến mãi ở trang thanh toán
              </li>
            </ul>
          </div>
        </div>
        <DrawerFooter className="pt-2 flex  flex-col border-t z-[9999]">
          <div
            className="block p-[10px]  w-full bg-redni text-[#fff] text-[13px]  cursor-pointe uppercase font-bold text-center cursor-pointer"
            onClick={() => {
              if (!copied) {
                handleCopy("taone");
              }
            }}
          >
            {copied ? "Đã sao chép" : "Sao chép mã"}
          </div>
          <DrawerClose className="text-redni border border-solid border-redni p-[10px] text-[13px] uppercase">
            <span>Đóng</span>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
