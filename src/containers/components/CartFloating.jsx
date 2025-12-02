import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import "react-lazy-load-image-component/src/effects/blur.css";
import formatPrice from "@/helpers/formatPrice";
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
import CartItem from "./Items/CartItem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
const CartFloating = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, onOpenChange] = useState(false);
  const { account } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.cart.cart);

  if (!account) {
    return null;
  }
  if (!isDesktop) {
    return (
      <div className="fixed bottom-0 right-0 left-0 bg-redni text-[#fff] flex items-center justify-between py-[12px] px-[20px] 2md:hidden z-[99]">
        <span> {cartData?.length} sản phẩm</span>
        <span>
          {" "}
          {formatPrice(
            cartData?.reduce((initial, result) => {
              return (
                initial + parseInt(result.price) * parseInt(result.quantity)
              );
            }, 0)
          )}
        </span>
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerTrigger
            asChild
            className="cursor-pointer text-[#fff] py-2 pl-4"
          >
            <span>Xem chi tiết</span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left rounded-t-[10px] bg-redni">
              <DrawerTitle>
                <div className="text-[15px]  font-medium text-[#fff] flex items-center justify-between">
                  <span className="text-[14px] font-normal basis-1/3">
                    {cartData?.length} sản phẩm
                  </span>
                  <span className="font-bold basis-1/3 text-center">
                    {formatPrice(
                      cartData?.reduce((initial, result) => {
                        return (
                          initial +
                          parseInt(result.price) * parseInt(result.quantity)
                        );
                      }, 0)
                    )}
                  </span>
                  <DrawerClose className="text-[#fff] basis-1/3 text-right">
                    <X size={20} className="ml-auto" />
                  </DrawerClose>
                </div>
              </DrawerTitle>
              <DrawerDescription className={"hidden"}>
                Thông tin giỏ hàng
              </DrawerDescription>
            </DrawerHeader>
            <div className="py-[15px] px-4">
              <div className="max-h-[360px] overflow-y-scroll cart-view-scroll">
                <ul className=" ">
                  {cartData?.map((product) => (
                    <CartItem product={product} key={product.id} />
                  ))}
                </ul>
              </div>
              <div className="  mb-[20px] flex justify-between items-center py-[10px] leading-6 px-3">
                <span className="text-blackni uppercase text-[14px]">
                  Tổng tiền :
                </span>
                <span className="text-redni font-bold text-[16px] ">
                  {" "}
                  {formatPrice(
                    cartData?.reduce((initial, result) => {
                      return (
                        initial +
                        parseInt(result.price) * parseInt(result.quantity)
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
                <Link
                  to={"/cart"}
                  onClick={() => {
                    onOpenChange(false);
                  }}
                >
                  Xem giỏ hàng
                </Link>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
};

export default CartFloating;
