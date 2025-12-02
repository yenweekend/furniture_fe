import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPurchased } from "@/apis/order";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import formatPrice from "@/helpers/formatPrice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";
import { Container, Truck } from "lucide-react";
const PurchaseOrder = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["purchase"],
    queryFn: getPurchased,
  });
  if (isPending) {
    return "loading";
  }
  if (isError) {
    return error.message;
  }
  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-none w-full flex justify-start border-b-[2px] border-[#ededed]">
          <TabsTrigger
            value="all"
            className={
              "text-[14px] font-bold text-black pb-5 px-3 uppercase border-b-[2px] border-transparent mr-[20px]"
            }
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className={
              "text-[14px] font-bold text-black pb-5 px-3 uppercase border-b-[2px] border-transparent"
            }
          >
            Hoàn thành
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className={
              "text-[14px] font-bold text-black pb-5 px-3 uppercase border-b-[2px] border-transparent"
            }
          >
            Chờ giao hàng
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className={" pt-[20px]"}>
          <div className="details flex flex-col gap-[30px]">
            {data.data.data.map((o) => (
              <li className="bg-[#fff] px-5 py-3" key={o.id}>
                <div className="flex items-center justify-between mb-2">
                  <p>
                    <span className="text-[14px] font-normal">
                      Đơn mua ngày:{" "}
                    </span>
                    <span className="text-inherit text-[14px] font-medium">
                      {" "}
                      {moment(o.createdAt)
                        .locale("vi")
                        .format("DD [tháng] MM, YYYY")}
                    </span>
                  </p>
                  {o.status === "success" ? (
                    <div className="gap-2 text-[#2bc38d] font-medium text-[14px] flex items-center justify-end">
                      <Truck />
                      Đã giao hàng thành công
                    </div>
                  ) : (
                    <div className="gap-2 text-[#FFCF50] font-medium text-[14px] flex items-center justify-endbg-redichi p-2 rounded-sm">
                      <Container />
                      Đang chờ giao hàng
                    </div>
                  )}
                </div>
                <div className="flex flex-col px-[12px] border-y border-solid border-shop py-[20px] gap-4">
                  {o.OrderDetails.map((item) => (
                    <div
                      className="flex items-center"
                      key={`${o.id}-${item.id}`}
                    >
                      <div className="w-[75px] h-[75px] overflow-hidden border border-solid cart-item mr-[15px] flex-shrink-0">
                        <LazyLoadImage
                          src={item.Product.thumbnail}
                          effect="blur"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-auto">
                        <div className="font-normal text-[14px] pr-[28px] text-blackni relative">
                          <p className="line-clamp-2 font-medium">
                            <Link to={item.Product.url}>
                              {item.Product.title}
                            </Link>
                          </p>
                          <span className="text-vendor text-[13px] font-medium">
                            Phân loại hàng : Kanji N3
                          </span>
                        </div>
                        <div className="flex items-center ">
                          <span className="text-[13px]">
                            Số lượng: &nbsp; {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="">
                        {item.price !== item.price_original ? (
                          <>
                            <span className="text-[--shop-color-text]   font-bold">
                              <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                                {formatPrice(item.price)}
                              </strong>
                            </span>
                            <span className="price-delete ml-[10px] text-[#878c8f] line-through font-light relative text-[13px]">
                              {formatPrice(item.price_original)}
                            </span>
                          </>
                        ) : (
                          <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                            {formatPrice(item.price_original)}
                          </strong>
                        )}
                      </div>
                    </div>
                  ))}
                  {o.Coupon && (
                    <div className="flex items-center justify-end  text-[13px] text-redichi">
                      <span className="capitalize">
                        Coupon Khuyến mãi: &nbsp;
                      </span>
                      <span className="uppercase font-bold">
                        {o.Coupon.code} &nbsp;
                      </span>
                      {o.Coupon.discount_type === "fixed" ? (
                        <span className="text-[#333]">
                          / &nbsp;Tiết kiệm: &nbsp;{" "}
                          <strong>
                            {formatPrice(o.Coupon.discount_value)}
                          </strong>
                        </span>
                      ) : (
                        <span className="text-[#333]">
                          / &nbsp;Giảm: &nbsp;{" "}
                          <strong>{o.Coupon.discount_value}%</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end text-[20px] text-redni font-bold mt-5">
                  <span className="text-[14px] text-[#333]">
                    Thành tiền: &nbsp;
                  </span>
                  {formatPrice(
                    o.OrderDetails.reduce((initial, result) => {
                      return (
                        initial +
                        parseInt(result.price) * parseInt(result.quantity)
                      );
                    }, 0)
                  )}
                </div>
              </li>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className={"pt-5"}>
          <div className="details flex flex-col gap-[30px]">
            {data.data.data
              .filter((item) => item.status === "success")
              .map((o) => (
                <li className="bg-[#fff] px-5 py-3" key={o.id}>
                  <div className="flex items-center justify-between mb-2">
                    <p>
                      <span className="text-[14px] font-normal">
                        Đơn mua ngày:{" "}
                      </span>
                      <span className="text-inherit text-[14px] font-medium">
                        {" "}
                        {moment(o.createdAt)
                          .locale("vi")
                          .format("DD [tháng] MM, YYYY")}
                      </span>
                    </p>
                    <div className="gap-2 text-[#2bc38d] font-medium text-[14px] flex items-center justify-end">
                      <Truck />
                      Đã giao hàng thành công
                    </div>
                  </div>
                  <div className="flex flex-col px-[12px] border-y border-solid border-shop py-[20px] gap-4">
                    {o.OrderDetails.map((item) => (
                      <div
                        className="flex items-center"
                        key={`${o.id}-${item.id}`}
                      >
                        <div className="w-[75px] h-[75px] overflow-hidden border border-solid cart-item mr-[15px] flex-shrink-0">
                          <LazyLoadImage
                            src={item.Product.thumbnail}
                            effect="blur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-auto">
                          <div className="font-normal text-[14px] pr-[28px] text-blackni relative">
                            <p className="line-clamp-2 font-medium">
                              <Link to={item.Product.url}>
                                {item.Product.title}
                              </Link>
                            </p>
                            <span className="text-vendor text-[13px] font-medium">
                              Phân loại hàng : Kanji N3
                            </span>
                          </div>
                          <div className="flex items-center ">
                            <span className="text-[13px]">
                              Số lượng: &nbsp; {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          {item.price !== item.price_original ? (
                            <>
                              <span className="text-[--shop-color-text]   font-bold">
                                <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                                  {formatPrice(item.price)}
                                </strong>
                              </span>
                              <span className="price-delete ml-[10px] text-[#878c8f] line-through font-light relative text-[13px]">
                                {formatPrice(item.price_original)}
                              </span>
                            </>
                          ) : (
                            <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                              {formatPrice(item.price_original)}
                            </strong>
                          )}
                        </div>
                      </div>
                    ))}
                    {o.Coupon && (
                      <div className="flex items-center justify-end  text-[13px] text-redichi">
                        <span className="capitalize">
                          Coupon Khuyến mãi: &nbsp;
                        </span>
                        <span className="uppercase font-bold">
                          {o.Coupon.code} &nbsp;
                        </span>
                        {o.Coupon.discount_type === "fixed" ? (
                          <span className="text-[#333]">
                            / &nbsp;Tiết kiệm: &nbsp;{" "}
                            <strong>
                              {formatPrice(o.Coupon.discount_value)}
                            </strong>
                          </span>
                        ) : (
                          <span className="text-[#333]">
                            / &nbsp;Giảm: &nbsp;{" "}
                            <strong>{o.Coupon.discount_value}%</strong>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end text-[20px] text-redni font-bold mt-5">
                    <span className="text-[14px] text-[#333]">
                      Thành tiền: &nbsp;
                    </span>
                    {formatPrice(
                      o.OrderDetails.reduce((initial, result) => {
                        return (
                          initial +
                          parseInt(result.price) * parseInt(result.quantity)
                        );
                      }, 0)
                    )}
                  </div>
                </li>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className={"pt-5"}>
          <div className="details flex flex-col gap-[30px]">
            {data.data.data
              .filter((item) => item.status === "pending")
              .map((o) => (
                <li className="bg-[#fff] px-5 py-3" key={o.id}>
                  <div className="flex items-center justify-between mb-2">
                    <p>
                      <span className="text-[14px] font-normal">
                        Đơn mua ngày:{" "}
                      </span>
                      <span className="text-inherit text-[14px] font-medium">
                        {" "}
                        {moment(o.createdAt)
                          .locale("vi")
                          .format("DD [tháng] MM, YYYY")}
                      </span>
                    </p>
                    <div className="gap-2 text-[#FFCF50] font-medium text-[14px] flex items-center justify-end">
                      <Container />
                      Đang chờ giao hàng
                    </div>
                  </div>
                  <div className="flex flex-col px-[12px] border-y border-solid border-shop py-[20px] gap-4">
                    {o.OrderDetails.map((item) => (
                      <div
                        className="flex items-center"
                        key={`${o.id}-${item.id}`}
                      >
                        <div className="w-[75px] h-[75px] overflow-hidden border border-solid cart-item mr-[15px] flex-shrink-0">
                          <LazyLoadImage
                            src={item.Product.thumbnail}
                            effect="blur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-auto">
                          <div className="font-normal text-[14px] pr-[28px] text-blackni relative">
                            <p className="line-clamp-2 font-medium">
                              <Link to={item.Product.url}>
                                {item.Product.title}
                              </Link>
                            </p>
                            <span className="text-vendor text-[13px] font-medium">
                              Phân loại hàng : Kanji N3
                            </span>
                          </div>
                          <div className="flex items-center ">
                            <span className="text-[13px]">
                              Số lượng: &nbsp; {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          {item.price !== item.price_original ? (
                            <>
                              <span className="text-[--shop-color-text]   font-bold">
                                <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                                  {formatPrice(item.price)}
                                </strong>
                              </span>
                              <span className="price-delete ml-[10px] text-[#878c8f] line-through font-light relative text-[13px]">
                                {formatPrice(item.price_original)}
                              </span>
                            </>
                          ) : (
                            <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                              {formatPrice(item.price_original)}
                            </strong>
                          )}
                        </div>
                      </div>
                    ))}
                    {o.Coupon && (
                      <div className="flex items-center justify-end  text-[13px] text-redichi">
                        <span className="capitalize">
                          Coupon Khuyến mãi: &nbsp;
                        </span>
                        <span className="uppercase font-bold">
                          {o.Coupon.code} &nbsp;
                        </span>
                        {o.Coupon.discount_type === "fixed" ? (
                          <span className="text-[#333]">
                            / &nbsp;Tiết kiệm: &nbsp;{" "}
                            <strong>
                              {formatPrice(o.Coupon.discount_value)}
                            </strong>
                          </span>
                        ) : (
                          <span className="text-[#333]">
                            / &nbsp;Giảm: &nbsp;{" "}
                            <strong>{o.Coupon.discount_value}%</strong>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end text-[20px] text-redni font-bold mt-5">
                    <span className="text-[14px] text-[#333]">
                      Thành tiền: &nbsp;
                    </span>
                    {formatPrice(
                      o.OrderDetails.reduce((initial, result) => {
                        return (
                          initial +
                          parseInt(result.price) * parseInt(result.quantity)
                        );
                      }, 0)
                    )}
                  </div>
                </li>
              ))}
          </div>
        </TabsContent>
      </Tabs>{" "}
    </>
  );
};

export default PurchaseOrder;
