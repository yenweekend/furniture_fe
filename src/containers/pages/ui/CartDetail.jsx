import React, { useEffect, useState } from "react";
import { Minus, Plus, Flame, CookingPot } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent } from "@/components/ui/card";
import { CouponCard } from "@/containers/components";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, deleteItem } from "@/apis/cart";
import formatPrice from "@/helpers/formatPrice";
import { Link } from "react-router-dom";
import UpdateQuantity from "@/containers/components/Items/UpdateQuantity";
import useMessage from "@/hooks/useMessage";
import { updateCheckoutItems } from "@/helpers/localstorage";
import CartDetailSkeleton from "@/containers/components/Skeleton/CartDetailSkeleton";
const CartDetail = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();
  const [productInCart, setProductInCart] = useState([]);
  const [productSelected, setProductSelected] = React.useState([]);

  const { account, isRefreshing } = useSelector((state) => state.auth);
  const { isPending, data } = useQuery({
    queryKey: ["cart"],
    queryFn: get,
    enabled: !!account,
  });
  const { mutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Đã xóa sản phẩm khỏi giỏ hàng!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message || "Đã có lỗi xảy ra vui lòng chờ chờ",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  useEffect(() => {
    if (data) {
      setProductInCart(data.data.products);
    }
  }, [data]);

  const handleSelectWhole = React.useCallback(
    (event) => {
      if (event.target.checked) {
        setProductSelected(productInCart);
      } else {
        setProductSelected([]);
      }
    },
    [productInCart]
  );
  const handleSelectProduct = React.useCallback((event, productItem) => {
    setProductSelected((state) => {
      if (event.target.checked) {
        return [...state, productItem];
      } else {
        return state.filter((item) => item.id !== productItem.id);
      }
    });
  }, []);
  if (isPending || !isRefreshing) {
    return <CartDetailSkeleton />;
  }
  return (
    <>
      <div className="max-w-[1400px] 2md:px-[15px] mx-auto flex 2md:flex-row flex-col 2md:items-stretch">
        <div className=" 2md:basis-2/3  2md:px-[15px] flex-shrink-0">
          <div className="bg-[#fff] shadow-card">
            <h1 className="text-[20px] text-redtitle font-bold px-5 py-3 border-b border-b-shop">
              Giỏ hàng của bạn
            </h1>
            {data.data.products.length > 0 ? (
              <>
                <div className="p-[15px]">
                  <p className="text-[16px] text-blackichi mb-[15px]">
                    Bạn đang có{" "}
                    <strong> {data.data.products.length} sản phẩm</strong> trong
                    giỏ hàng
                  </p>
                  <div className="border-[2px] border-shop rounded-[8px] px-[10px] py-[8px] flex flex-col">
                    <div className="py-[15px] 2md:px-[10px] flex border-b-shop border-b items-center justify-between">
                      <label className="flex items-center checkbox relative mr-[10px] font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          className="p-[6px] cursor-pointer relative"
                          checked={
                            productSelected.length === productInCart.length
                          }
                          onChange={handleSelectWhole}
                        ></input>
                        <span className="ml-2">Chọn tất cả</span>
                      </label>
                      <button
                        className={`text-[13px] ${
                          productSelected.length === productInCart.length
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        Xóa
                      </button>
                    </div>
                    {data.data.products.map((item, index) => (
                      <div
                        className="py-[15px] 2md:px-[10px] flex border-b-shop border-b [&:last-child]:border-b-transparent"
                        key={index}
                      >
                        <label className="flex items-center checkbox relative mr-[10px]">
                          <input
                            type="checkbox"
                            className="p-[6px] cursor-pointer relative"
                            value={item.id}
                            checked={productSelected.some(
                              (product) => product.id === item.id
                            )}
                            onChange={(event) => {
                              handleSelectProduct(event, item);
                            }}
                          ></input>
                        </label>
                        <div className="2md:w-[80px] 2md:h-[80px] h-[60px] w-[60px] block relative flex-shrink-0">
                          <Link
                            className="w-full h-full"
                            to={item.url}
                            onClick={(e) => e.preventDefault()} // Prevent navigation on click
                          >
                            <img
                              src={item.thumbnail}
                              alt=""
                              className="h-full w-full object-cover border border-solid border-shop"
                            />
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div
                                className="absolute w-5 h-5 bg-[#8f9bb3] text-[#fff] flex items-center justify-center text-[8px] rounded-full top-[-7px] left-[-10px] cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                Xóa
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className={"hidden"}>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription
                                  className={"text-center"}
                                >
                                  Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ
                                  hàng?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter
                                className={
                                  "flex items-center justify-center gap-[15px]"
                                }
                              >
                                <AlertDialogCancel
                                  className={"uppercase rounded font-bold"}
                                >
                                  Hủy
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className={"uppercase rounded font-bold"}
                                  onClick={() => {
                                    mutate(item.id);
                                  }}
                                >
                                  đồng ý
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        <div className="flex-auto px-3 2md:px-[18px] flex flex-col">
                          <Link
                            to={item.url}
                            className="text-blackni text-[14px] 2md:text-[15px] mb-[10px] max-990:line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <span className="text-[#8f9bb3] font-semibold text-[12px] 2md:text-[14px]">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <div className="ml-auto flex items-end flex-col">
                          <span className=" text-[13px] 2md:text-[16px] text-blackni font-semibold mb-2">
                            {formatPrice(item.price * parseInt(item.quantity))}
                          </span>
                          <UpdateQuantity product={item} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-[15px] pb-[15px]">
                  <div className="p-[15px] mt-5 bg-[#f3f4f4]">
                    <label
                      htmlFor="note"
                      className="text-blackni font-semibold text-[16px]"
                    >
                      Ghi chú đơn hàng
                    </label>
                    <Textarea placeholder="Type your message here." id="note" />
                  </div>
                </div>
              </>
            ) : (
              <p className="p-10 text-[18px] text-center flex items-center justify-center gap-3">
                <Flame className="text-redichi" />
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </p>
            )}
          </div>
        </div>
        <div className=" 2md:basis-1/3 2md:max-w-[33.33333%]  2md:px-[15px] flex-grow-0 flex-shrink-0">
          <div className="sticky top-0 shadow-card">
            <div className="bg-[#fff] p-[15px]">
              <h1 className="text-[20px] text-redtitle font-bold px-5 py-3 border-b border-b-shop">
                Thông tin đơn hàng
              </h1>
              <div className="py-[10px] mb-[10px] border-b border-b-shop flex justify-between items-center">
                <span className="text-[16px] text-blackni font-semibold">
                  Tổng tiền:
                </span>
                <span className="text-[24px] text-redni font-bold">
                  {formatPrice(
                    productSelected.reduce((initial, result) => {
                      return (
                        initial +
                        parseInt(result.price) * parseInt(result.quantity)
                      );
                    }, 0)
                  )}{" "}
                </span>
              </div>
              <ul className="  list-outside px-[15px]">
                <li className="text-[13px] list-disc marker:text-vendor text-coupontext font-normal  relative ">
                  Phí vận chuyển sẽ được tính ở trang Thanh toán.
                </li>
                <li className="text-[13px] list-disc marker:text-vendor text-coupontext font-normal  relative ">
                  Mã giảm giá được nhập ở trang Thanh toán
                </li>
              </ul>
              {data.data.products.length === 0 ? (
                <div className="text-center uppercase font-bold cursor-pointer text-[#fff]  py-[8px] px-[10px] mt-3 2md:block hidden bg-[#c8c8c8]  flex-auto">
                  Mua hàng
                </div>
              ) : (
                <Link
                  to="/checkouts"
                  className=" text-center uppercase font-bold cursor-pointer text-[#fff] bg-redni py-[8px] px-[10px] mt-3 2md:block hidden"
                  onClick={(event) => {
                    if (productSelected.length === 0) {
                      event.preventDefault();
                      messageApi.open({
                        type: "warning",
                        content: "Bạn chưa chọn sản phẩm nào",
                        className: "custom-class",
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      });
                    }
                    const productIds = productSelected.map((p) => p.id);
                    updateCheckoutItems(productIds);
                  }}
                >
                  Mua hàng
                </Link>
              )}
            </div>
            <div className="bg-[#fff] px-[15px] pb-[15px] pt-[42px] relative mt-[15px] flex ">
              <Carousel
                opts={{
                  align: "start",
                }}
                className=" group max-990:w-[50%] w-full"
              >
                <CarouselContent>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="px-[6px]">
                        <Card className={"rounded-none"}>
                          <CardContent className="flex p-0 flex-col gap-[15px]">
                            {Array.from({ length: 2 }).map((_, index) => (
                              <CouponCard />
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute top-[4px] right-[20px] flex items-center gap-4  ">
                  <CarouselPrevious
                    className={"bg-[#fff] shadow-carousel text-blackni"}
                  />
                  <CarouselNext
                    className={"bg-[#fff] shadow-carousel text-blackni"}
                  />
                </div>
              </Carousel>
              <div className="flex flex-col gap-3 2md:hidden ">
                <div className="px-3 py-8 text-[14px] font-bold ">
                  Cùng{" "}
                  <strong className="text-redichi text-[18px] font-bold">
                    Baya
                  </strong>{" "}
                  sắm sửa cho ngôi nhà của bạn!
                </div>
                <div className="flex-auto flex items-center justify-center">
                  <CookingPot className="text-redichi " size={80} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed px-[10px] py-2 bg-[#fff] z-50 left-0 right-0 bottom-0 shadow-rd 2md:hidden">
          {data.data.products.length === 0 ? (
            <div className="text-center uppercase font-bold cursor-pointer text-[#fff]  py-[8px] px-[10px] mt-3  bg-[#c8c8c8]  flex-auto">
              Mua hàng
            </div>
          ) : (
            <Link
              to="/checkouts"
              className="  text-center uppercase font-bold cursor-pointer text-[#fff] bg-redni py-[8px] px-[10px]  flex-auto block "
            >
              thanh toán
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDetail;
