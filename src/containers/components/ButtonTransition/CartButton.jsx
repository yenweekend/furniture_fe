import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
import { Modal } from "antd";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../Dropdown/Dropdown";
import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "@/apis/cart";
import { useSelector } from "react-redux";
import formatPrice from "@/helpers/formatPrice";
import CartItem from "../Items/CartItem";
import useMessage from "@/hooks/useMessage";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux-toolkit/slice/cart.slice";
export function CartButtonTransition() {
  const messageApi = useMessage();
  const dispatch = useDispatch();
  const { account, loading, error } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 990px)");
  const {
    isPending,
    isRefetching,
    isError,
    data,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: get,
    enabled: !!account,
  });

  React.useEffect(() => {
    if (data) {
      dispatch(setCart(data.data.products));
    }
  }, [data]);
  if (!account) {
    return (
      <button
        className={
          "text-[#fff] mx-[2px] items-center justify-center flex  text-sm font-medium 2md:px-4 px-1"
        }
        onClick={() => {
          alert("Hãy đăng nhập để trải nghiệm tính năng!");
        }}
      >
        <a className="items-center  flex relative">
          <span className="w-6 h-6">
            <ShoppingCart size={24} strokeWidth={1.5} />
          </span>
          <span className="box-text ml-[10px] text-left text-[14px] max-990:hidden whitespace-nowrap">
            Giỏ hàng
          </span>
          <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-11px] left-[12px]">
            0
          </span>
        </a>{" "}
      </button>
    );
  }

  if (isError) {
    messageApi.open({
      type: "error",
      content: "Đã xảy ra lỗi hệ thống",
      className: "custom-class",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    });
    if (isDesktop) {
      return (
        <div
          className={
            "text-[#fff] mx-[2px] items-center justify-center flex  text-sm font-medium 2md:px-4 px-1"
          }
        >
          <span className="items-center  flex relative">
            <span className="w-6 h-6">
              <ShoppingCart size={24} strokeWidth={1.5} />
            </span>
            <span className="box-text ml-[10px] text-left text-[14px] max-990:hidden whitespace-nowrap">
              Giỏ hàng
            </span>
            <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-11px] left-[12px]">
              0
            </span>
          </span>{" "}
        </div>
      );
    }
    return (
      <div className="items-center justify-center flex  text-sm font-medium relative 2md:px-4 md:px-3 px-[8px]  text-[#fff]">
        <ShoppingCart strokeWidth={1.5} size={20} />
        <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-8px] left-[24px]">
          0
        </span>
      </div>
    );
  }

  if (isDesktop) {
    if (isPending) {
      return (
        <div className="items-center justify-center flex  text-sm font-medium relative 2md:px-4 md:px-3 px-[8px] text-[#fff] ">
          <span className="items-center  flex relative">
            <span className="w-6 h-6">
              <ShoppingCart size={24} strokeWidth={1.5} />
            </span>
            <span className="box-text ml-[10px] text-left text-[14px] max-990:hidden whitespace-nowrap">
              Giỏ hàng
            </span>
            <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-11px] left-[12px]">
              0
            </span>
          </span>
        </div>
      );
    }
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger className={"text-[#fff] mx-[2px] 2md:px-4"}>
          <a className="items-center  flex relative">
            <span className="w-6 h-6">
              <ShoppingCart size={24} strokeWidth={1.5} />
            </span>
            <span className="box-text ml-[10px] text-left text-[14px] max-990:hidden whitespace-nowrap">
              Giỏ hàng
            </span>
            <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-11px] left-[12px]">
              {data.data.products.length}
            </span>
          </a>
        </DropdownTrigger>
        <DropdownContent className={"py-[15px] px-[24px] w-[420px]"}>
          <div className="text-center pb-[8px]  border-b border-solid border-shop">
            <h2 className="text-[15px] uppercase font-medium text-redichi ">
              thông tin giỏ hàng
            </h2>
          </div>

          {data.data.products.length > 0 ? (
            <div className="max-h-[320px] overflow-y-scroll cart-view-scroll">
              <ul className=" ">
                {data.data.products.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-3 py-4  border-b border-solid border-shop">
              <ShoppingCart
                size={30}
                strokeWidth={1.4}
                className="text-redichi"
              />
              <span className="text-[13px] text-vendor">
                Chưa có sản phẩm nào trong giỏ hàng{" "}
              </span>
            </div>
          )}
          <div className="  mb-[20px] flex justify-between items-center py-[10px] px-[12px] leading-6">
            <span className="text-blackni uppercase text-[14px]">
              Tổng tiền :
            </span>
            <span className="text-redni font-bold text-[16px] ">
              {formatPrice(
                data.data.products.reduce((initial, result) => {
                  return (
                    initial + parseInt(result.price) * parseInt(result.quantity)
                  );
                }, 0)
              )}
            </span>
          </div>
          <a
            href="/cart"
            className="block p-[10px] mt-[5px] w-full bg-redni text-[#fff] text-[13px] font-medium cursor-pointe text-center uppercase "
          >
            Xem giỏ hàng
          </a>
        </DropdownContent>
      </Dropdown>
    );
  }
  if (isPending) {
    return (
      <div className="items-center justify-center flex  text-sm font-medium relative 2md:px-4 md:px-3 px-[8px]  text-[#fff]">
        <ShoppingCart strokeWidth={1.5} size={20} />
        <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-8px] left-[24px]">
          0
        </span>
      </div>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen} modal={true}>
      <DrawerTrigger asChild className="cursor-pointer text-[#fff] py-2 ">
        <button className="items-center justify-center flex  text-sm font-medium relative 2md:px-4 md:px-3 px-[8px] ">
          <ShoppingCart strokeWidth={1.5} size={20} />
          <span className="badge text-[12px] absolute w-[16px] h-[16px] bg-[#ff0000] rounded-full flex items-center justify-center text-[#fff] top-[-2px] left-[24px]">
            {data.data.products.length}
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left rounded-t-[10px] bg-redni">
          <DrawerTitle>
            <div className="text-[15px]  font-medium text-[#fff] flex items-center justify-between">
              <span className=" basis-1/3 text-[14px] font-normal">
                {data.data.products.length} sản phẩm
              </span>
              <span className=" basis-1/3  text-center font-bold ">
                {formatPrice(
                  data.data.products.reduce((initial, result) => {
                    return initial + parseInt(result.price);
                  }, 0)
                )}
              </span>
              <div className="basis-1/3 flex justify-end">
                <DrawerClose className="text-[#fff]">
                  <X stroke="#fff" size={20} />
                </DrawerClose>
              </div>
            </div>
          </DrawerTitle>
          <DrawerDescription className={"hidden"}>
            Thông tin giỏ hàng
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-[15px] ">
          {data.data.products.length > 0 ? (
            <div className="max-h-[360px] overflow-y-scroll cart-view-scroll">
              <ul className=" ">
                {data.data.products.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-3 py-4  border-b border-solid border-shop">
              <ShoppingCart
                size={30}
                strokeWidth={1.4}
                className="text-redichi"
              />
              <span className="text-[13px] text-vendor">
                Chưa có sản phẩm nào trong giỏ hàng{" "}
              </span>
            </div>
          )}

          <div className="  mb-[20px] flex justify-between items-center py-[10px] leading-6 px-[12px]">
            <span className="text-blackni uppercase text-[14px]">
              Tổng tiền :
            </span>
            <span className="text-redni font-bold text-[16px] ">
              {formatPrice(
                data.data.products.reduce((initial, result) => {
                  return (
                    initial + parseInt(result.price) * parseInt(result.quantity)
                  );
                }, 0)
              )}
            </span>
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose
            asChild
            className="block p-[10px] mt-[5px] w-full bg-redni text-[#fff] text-[13px] font-medium cursor-pointe text-center uppercase"
          >
            <a to={"/cart"}>Xem giỏ hàng</a>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
