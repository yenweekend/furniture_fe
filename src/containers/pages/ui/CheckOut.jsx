import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  UserRound,
  Check,
  ShoppingCart,
  MapPin,
  Loader2,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { get } from "@/apis/cart";
import {
  getCheckoutItems,
  removeMultipleCheckoutItems,
} from "@/helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import useMessage from "@/hooks/useMessage";
import formatPrice from "@/helpers/formatPrice";
import { Link, useNavigate } from "react-router-dom";
import { getProvince} from "@/apis/address";
import { create, getPurchaserInfo } from "@/apis/order";
import AddressComponent from "@/containers/components/Address";
import CouponInput from "@/containers/components/CouponInput";
import Loading from "@/containers/components/Loading";
import {
  setTotalOrderPrice,
  setCouponDetail,
} from "@/redux-toolkit/slice/coupon.slice";
import { Modal } from "antd";
const showSessionExpiredModal = () => {
  const modal = Modal.success({
    title: "Mua hàng thành công!",
    content: (
      <div className="mx-auto rounded-full flex items-center justify-center w-8 h-8 bg-[#2bc38d] text-[#fff]">
        <Check size={20} strokeWidth={2} />
      </div>
    ),
    footer: null,
    className: "custom-modal-v1",
  });
  // Auto close modal after 3 seconds
  setTimeout(() => {
    modal.destroy();
  }, 4000);
};
const CheckOut = () => {
  const navigate = useNavigate();
  const messageApi = useMessage();
  const makeOrderMutation = useMutation({
    mutationFn: create,
    onSuccess: (response) => {
      removeMultipleCheckoutItems(response.data.productPurchasedId);
      navigate("/");
      showSessionExpiredModal();
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.response.data.msg || "Đã có lỗi xảy ra vui lòng thử lại",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const dispatch = useDispatch();
  const couponDetail = useSelector((state) => state.coupon.couponDetail);
  const [open, onOpenChange] = React.useState(false);
  const [step, setStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  // const [shippingAddress, setShippingAddress] = useState(null);
  //   React.useState(null);
  const [shippingAddressConfirmId, setShippingAddressConfirmId] =
    React.useState(null);
  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    React.useState(null);
  const [productInCheckOut, setProductInCheckOut] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment: "",
    },
  });
  const useFormMethods = useForm({
    defaultValues: {
      code: "",
    },
  });
  const { account } = useSelector(
    (state) => state.auth
  );
  const {
    isPending,
    isError,
    data,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: get,
    enabled: !!account,
  });
  const { data: purchaserData, ...getPurchaseInfo } = useQuery({
    queryKey: ["purchase-info"],
    queryFn: getPurchaserInfo,
  });

  const getProvinceQuery = useQuery({
    queryKey: ["province"],
    queryFn: getProvince,
  });

  useEffect(() => {
    if (data) {
      const productCheckoutIds = getCheckoutItems();
      setProductInCheckOut(
        data.data.products.filter((product) =>
          productCheckoutIds.includes(product.id)
        )
      );
    }
  }, [data]);
  useEffect(() => {
    if (productInCheckOut.length > 0) {
      const totalPrice = productInCheckOut.reduce((initial, result) => {
        return initial + parseInt(result.price) * parseInt(result.quantity);
      }, 0);
      dispatch(setTotalOrderPrice(totalPrice));
      if (!couponDetail) {
        setTotalPrice(totalPrice);
      } else {
        if (couponDetail.discount_type === "fixed") {
          setTotalPrice(totalPrice - parseInt(couponDetail.discount_value));
        } else {
          setTotalPrice((totalPrice * couponDetail.discount_value) / 100);
        }
      }
    }
  }, [productInCheckOut, couponDetail]),
    useEffect(() => {
      if (purchaserData) {
        const defaultAddress = purchaserData.data.addresses.find(
          (item) => item.on_used
        );
        // setShippingAddress(defaultAddress);
        setSelectedShippingAddressId(defaultAddress.id);
        setShippingAddressConfirmId(defaultAddress.id);
      }
    }, [purchaserData]);
  const handleChangeAddressShiping = (id) => {
    setSelectedShippingAddressId(id);
  };
  const handleOpenChange = (open) => {
    if (open) {
      setSelectedShippingAddressId(shippingAddressConfirmId);
    }
    onOpenChange(open);
  };
  if (isPending || getProvinceQuery.isPending || getPurchaseInfo.isPending) {
    return <Loading />;
  }
  if (isError) {
    messageApi.open({
      type: "error",
      content: cartError.message || "Đã có lỗi xảy ra vui lòng chờ",
      className: "custom-class",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    });
  }
  if (getProvinceQuery.isError) {
    messageApi.open({
      type: "error",
      content: "Đã có lỗi lấy dữ liệu tỉnh thành",
      className: "custom-class",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    });
  }
  const onSubmit = (data) => {
    dispatch(setCouponDetail(null));

    const pay_method = data.payment;
    const { address, address_detail } = purchaserData.data.addresses.find(
      (item) => item.id === shippingAddressConfirmId
    );
    const originalTotalPrice = productInCheckOut.reduce((initial, result) => {
      return initial + parseInt(result.price) * parseInt(result.quantity);
    }, 0);
    let discount_value = null,
      discount_type = null,
      coupon_name = null;
    if (couponDetail) {
      discount_value = couponDetail.discount_value;
      discount_type = couponDetail.discount_type;
      coupon_name = couponDetail.code;
    }
    makeOrderMutation.mutate({
      items: productInCheckOut,
      address,
      address_detail,
      pay_method,
      original_total_price: originalTotalPrice,
      total_price: totalPrice,
      discount_value,
      discount_type,
      coupon_name,
    });
  };
  return (
    <CheckoutWrapper>
      <div className="2md:w-[80%] px-[5%] mx-auto flex checkout w-[100%] 2md:flex-row flex-col 2md:items-stretch pb-[30px]">
        <div className="basis-[60%] 2md:pt-[56px] 2md:pr-[66px] 2md:border-[#eee] 2md:border-r-[2px]">
          <h1
            className="text-[28px]  text-blackni"
            style={{
              fontFamily: " Helvetica Neue, sans-serif",
            }}
          >
            Baya
          </h1>
          <ul className="mt-[15px] flex items-center mb-[15px] line-clamp-1 ">
            <li className=" [&:first-child]:pl-0 whitespace-nowrap px-[15px] relative flex items-center">
              <div className="absolute -right-[9px] center-y">
                <ChevronRight size={14} className="stroke-vendor " />
              </div>
              <Link to="/cart" className=" text-[12px] font-light">
                Giỏ hàng
              </Link>
            </li>
            <li
              className=" [&:first-child]:pl-0 whitespace-nowrap px-[15px] text-[12px] relative font-light cursor-pointer"
              onClick={() => setStep(1)}
            >
              <div className="absolute -right-[9px] center-y">
                <ChevronRight size={14} className="stroke-vendor " />
              </div>
              Thông tin giao hàng
            </li>
            <li className=" [&:first-child]:pl-0 whitespace-nowrap px-[15px] text-[12px] relative font-light text-vendor">
              Phương thức thanh toán
            </li>
          </ul>
          <div className=" overflow-x-hidden">
            <motion.div
              className="flex"
              initial={{ x: step === 2 ? 0 : "-100%" }}
              animate={{
                x: step === 2 ? "-100%" : 0,
              }}
            >
              <div className="w-[100%] flex-shrink-0">
                <div className=" ">
                  <h1 className="text-[20px] font-semibold text-blackni">
                    Thông tin giao hàng
                  </h1>

                  <div className="flex items-center gap-3 my-[15px]">
                    <div className="w-[50px] h-[50px] overflow-hidden flex-shrink-0 bg-[#d8d8d8] flex items-center justify-center">
                      <UserRound size={26} stroke="#fff" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-vendor">
                        {purchaserData?.data?.userInfo.firstName +
                          " " +
                          purchaserData?.data?.userInfo.lastName}{" "}
                        ({purchaserData?.data?.userInfo.email})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-2 text-redni">
                  <MapPin strokeWidth={2} size={20} />
                  <span className="text-[14px] font-medium">
                    Địa chỉ nhận hàng
                  </span>
                </div>
                {shippingAddressConfirmId ? (
                  <div className=" flex items-center text-[14px] font-normal">
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer">
                        <p className="line-clamp-1">
                          (+84)&nbsp;
                          <strong>
                            {purchaserData.data.addresses
                              .find(
                                (add) => shippingAddressConfirmId === add.id
                              )
                              .phone_number.substring(1)}
                            &nbsp;
                          </strong>
                          <span>
                            {purchaserData.data.addresses
                              .find(
                                (add) => shippingAddressConfirmId === add.id
                              )
                              .address.replaceAll("-", ",")}
                            &nbsp;
                          </span>
                          <span>
                            {
                              purchaserData.data.addresses.find(
                                (add) => shippingAddressConfirmId === add.id
                              ).address_detail
                            }
                          </span>
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-[400px] rounded-none bg-[#fff]">
                        <ul className="list-outside ml-4">
                          <li className="list-disc marker:text-redichi">
                            <strong>Số điện thoại người nhận:</strong>&nbsp;{" "}
                            {
                              purchaserData.data.addresses.find(
                                (add) => shippingAddressConfirmId === add.id
                              ).phone_number
                            }
                          </li>
                          <li className="list-disc marker:text-redichi">
                            <strong>Địa chỉ:</strong>&nbsp;{" "}
                            {purchaserData.data.addresses
                              .find(
                                (add) => shippingAddressConfirmId === add.id
                              )
                              .address.replaceAll("-", ",")}
                            &nbsp;
                          </li>
                          <li className="list-disc marker:text-redichi">
                            <strong>Địa chỉ cụ thể:</strong>&nbsp;{" "}
                            {purchaserData.data.addresses
                              .find(
                                (add) => shippingAddressConfirmId === add.id
                              )
                              .address_detail.replaceAll("-", ",")}
                            &nbsp;
                          </li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>

                    <Dialog open={open} onOpenChange={handleOpenChange}>
                      <DialogTrigger asChild>
                        <Button
                          className={`text-[14px] cursor-pointer text-[#5760fb] font-medium`}
                          variant="outline"
                        >
                          Thay đổi
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="sm:max-w-[500px] rounded-none"
                        onInteractOutside={(e) => e.preventDefault()} // Prevent closing on overlay click
                      >
                        <DialogHeader>
                          <DialogTitle>Địa chỉ của tôi</DialogTitle>
                        </DialogHeader>
                        {purchaserData.data.addresses.map((item) => (
                          <>
                            <label
                              key={item.id}
                              className="flex items-center cursor-pointer overflow-hidden radio py-[6px] border-r-[2px] border-solid border-transparent pl-[4px] hover:border-r-redichi transition-all duration-150 ease-linear"
                              htmlFor={`my-address-${item.id}`}
                            >
                              <input
                                type="radio"
                                name="my-address"
                                value={item.id}
                                id={`my-address-${item.id}`}
                                className="p-[6px]"
                                checked={selectedShippingAddressId === item.id}
                                onChange={() =>
                                  handleChangeAddressShiping(item.id)
                                }
                              />

                              <AddressComponent
                                setDefault={false}
                                province={getProvinceQuery.data.data.data}
                                data={item}
                              />
                            </label>
                          </>
                        ))}
                        <DialogFooter>
                          <Button
                            variant="primary"
                            onClick={() => {
                              onOpenChange(false);
                            }}
                          >
                            Trở lại
                          </Button>
                          <Button
                            type="submit"
                            onClick={() => {
                              setShippingAddressConfirmId(
                                selectedShippingAddressId
                              );
                              onOpenChange(false);
                            }}
                          >
                            Xác nhận
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <>
                    <div className="mt-[15px]  ">form select địa chỉ</div>
                  </>
                )}
                <div className="flex items-center justify-between mt-[15px]">
                  <Link
                    to="/cart"
                    className="py-5 px-6 text-[14px] font-medium bg-redichi text-[#fff] text-center"
                  >
                    Giỏ hàng
                  </Link>
                  <button
                    className="text-[#fff] text-center py-5 px-6 text-[14px] font-medium bg-[#338dbc]"
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    Tiếp tục với hình thức thanh toán
                  </button>
                </div>
              </div>
              <div className="w-[100%] flex-shrink-0 ">
                <div className="2md:hidden">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border-none"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={
                          " py-[10px]  text-[13px] font-bold text-[#338dbc] border-y  border-[#eee] pl-2 pr-[80px] border-none relative"
                        }
                      >
                        <div className="flex items-center gap-2 ">
                          <ShoppingCart size={20} stroke="#338dbc" />
                          Hiển thị thông tin đơn hàng
                          <span className="absolute right-2 center-y text-[#333]">
                            68.000đ
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={"p-[10px] border-none"}>
                        <div className="flex flex-col border-b border-b-solid border-b-[#d9d9d9]">
                          {productInCheckOut.map((product) => (
                            <>
                              <div className="flex pb-[15px]" key={product.id}>
                                <div className="w-[60px] h-[60px] block relative flex-shrink-0">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover border border-solid border-shop flex-shrink-0"
                                  />

                                  <div
                                    className="absolute w-5 h-5 bg-[#8f9bb3] text-[#fff] flex items-center justify-center text-[12px] rounded-full top-[-7px] right-[-10px] cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    {product.quantity}
                                  </div>
                                </div>
                                <div className=" px-[18px] flex flex-col w-[60%]">
                                  <p className="text-blackni text-[14px] line-clamp-2">
                                    {product.title}
                                  </p>
                                  <span className="text-[#8f9bb3]  text-[14px]">
                                    {formatPrice(parseInt(product.price))}
                                  </span>
                                </div>
                                <div className="ml-auto flex items-center justify-center">
                                  <span className="text-[14px] text-[#4b4b4b]  mb-2">
                                    {formatPrice(
                                      parseInt(product.price) *
                                        parseInt(product.quantity)
                                    )}
                                  </span>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                        <CouponInput useFormMethods={useFormMethods} />

                        <div className="border-b border-b-solid border-b-[#d9d9d9] py-[15px]">
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] text-[#8f9bb3]">
                              Tạm tính
                            </span>
                            <span className="text-[14px] text-[#8f9bb3]">
                              {formatPrice(totalPrice || 0)}{" "}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] text-[#8f9bb3]">
                              Phí vận chuyển
                            </span>
                            <span className="text-[14px] text-[#8f9bb3]">
                              0đ
                            </span>
                          </div>
                        </div>
                        <div className="border-b border-b-solid py-[15px]">
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] text-[#8f9bb3]">
                              Tổng cộng
                            </span>
                            <span className=" text-blackni text-[20px]">
                              <span className="text-[14px] uppercase text-vendor mr-3">
                                VND
                              </span>
                              {formatPrice(totalPrice || 0)}{" "}
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className=" ">
                  <h1 className="text-[20px] font-semibold text-blackni mb-5">
                    Phương thức vận chuyển
                  </h1>
                  <div className="p-[18px] border border-solid border-[#d9d9d9]">
                    <label
                      htmlFor="delivery-method"
                      className="checkbox-payment  flex items-center cursor-pointer"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        id="delivery-method"
                        name="delivery-method"
                        value={"delivery-method"}
                        checked
                        className="appearance-none outline-none p-[9px] relative "
                      />
                      <span className=" text-[14px] text-[#737373] ml-[10px]">
                        Phí vận chuyển báo sau
                      </span>
                    </label>
                  </div>
                </div>
                <div className=" ">
                  <h1 className="text-[20px] font-semibold text-blackni mb-5">
                    Phương thức thanh toán
                  </h1>
                  <div className="flex flex-col">
                    <div className="p-[18px] border  [&:nth-child(-n+2)]:border-b-transparent  border-solid border-[#d9d9d9]">
                      <label
                        htmlFor="code"
                        className="checkbox-payment  flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          id="code"
                          {...register("payment", {
                            required: {
                              value: true,
                              message: "Vui lòng chọn phương thức thanh toán",
                            },
                          })}
                          value={"code"}
                          className="appearance-none relative outline-none p-[9px]   "
                        />
                        <div className="flex items-center">
                          <div className="w-10 h-10 overflow-hidden flex-shrink-0 flex ml-[10px]">
                            <img
                              src="	https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                              alt=""
                              className="w-full h-ful object-cover border border-solid border-[#d9d9d9] rounded"
                            />
                          </div>
                          <span className=" text-[14px] text-[#737373] ml-[10px]">
                            Thanh toán khi giao hàng (COD)
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="p-[18px] border  [&:nth-child(-n+2)]:border-b-transparent  border-solid border-[#d9d9d9]">
                      <label
                        htmlFor="momo"
                        className="checkbox-payment  flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          id="momo"
                          {...register("payment", {
                            required: {
                              value: true,
                              message: "Vui lòng chọn phương thức thanh toán",
                            },
                          })}
                          value={"momo"}
                          className="appearance-none relative outline-none p-[9px]  "
                        />
                        <div className="flex items-center">
                          <div className="w-10 h-10 overflow-hidden flex-shrink-0 flex ml-[10px]">
                            <img
                              src="	https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6"
                              alt=""
                              className="w-full h-ful object-cover border border-solid border-[#d9d9d9] rounded"
                            />
                          </div>
                          <span className=" text-[14px] text-[#737373] ml-[10px]">
                            Ví MOMO
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="p-[18px] border  [&:nth-child(-n+2)]:border-b-transparent  border-solid border-[#d9d9d9]">
                      <label
                        htmlFor="vnpay"
                        className="checkbox-payment  flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          id="vnpay"
                          {...register("payment", {
                            required: {
                              value: true,
                              message: "Vui lòng chọn phương thức thanh toán",
                            },
                          })}
                          value={"vnpay"}
                          className="appearance-none relative outline-none p-[9px]  "
                        />
                        <div className="flex items-center ">
                          <div className="w-10 h-10 overflow-hidden flex-shrink-0 flex ml-[10px]">
                            <img
                              src="https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=6"
                              alt=""
                              className="w-full h-ful object-cover border border-solid border-[#d9d9d9] rounded"
                            />
                          </div>
                          <div className=" ml-[10px]">
                            <span className=" text-[14px] text-[#737373] ">
                              Thẻ ATM/Visa/Master/JCB/QR Pay qua cổng VNPAY
                            </span>
                            <img
                              src="https://hstatic.net/0/0/global/design/seller/image/payment/atm_visa_master_jcb.svg?v=6"
                              alt=""
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  {errors.payment && (
                    <p className="text-[13px] text-redni font-medium mt-2">
                      {errors.payment.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-[30px]">
                  <Link
                    to="/cart"
                    className="py-5 px-6 text-[14px] font-medium bg-redichi text-[#fff] text-center"
                  >
                    Giỏ hàng
                  </Link>
                  {makeOrderMutation.isPending ? (
                    <Button
                      disabled
                      className={
                        "text-[#fff] text-center py-5 px-6 text-[14px] font-medium bg-[#338dbc] rounded-none"
                      }
                    >
                      <Loader2 className="animate-spin" />
                      <span>Vui lòng chờ</span>
                    </Button>
                  ) : (
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="text-[#fff] text-center py-5 px-6 text-[14px] font-medium bg-[#338dbc]"
                    >
                      Hoàn tất thanh toán
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="basis-[40%] pt-[56px] 2md:pl-10 max-990:hidden">
          <div className="flex flex-col border-b border-b-solid border-b-[#d9d9d9]">
            {productInCheckOut.map((product) => (
              <>
                <div className="flex pb-[15px]" key={product.id}>
                  <div className="w-[60px] h-[60px] block relative flex-shrink-0">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="h-full w-full object-cover border border-solid border-shop flex-shrink-0"
                    />

                    <div
                      className="absolute w-5 h-5 bg-[#8f9bb3] text-[#fff] flex items-center justify-center text-[12px] rounded-full top-[-7px] right-[-10px] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {product.quantity}
                    </div>
                  </div>
                  <div className=" px-[18px] flex flex-col w-[60%]">
                    <p className="text-blackni text-[14px] line-clamp-2">
                      {product.title}
                    </p>
                    <span className="text-[#8f9bb3]  text-[14px]">
                      {" "}
                      {formatPrice(parseInt(product.price))}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center justify-center">
                    <span className="text-[14px] text-[#4b4b4b]  mb-2">
                      {formatPrice(
                        parseInt(product.price) * parseInt(product.quantity)
                      )}{" "}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>
          <CouponInput useFormMethods={useFormMethods} />

          {couponDetail && (
            <div className="border-b border-b-solid border-b-[#d9d9d9] py-[15px]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#8f9bb3]">Mã áp dụng</span>
                <span className="text-[14px] text-redichi">
                  {couponDetail.code}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#8f9bb3]">Giảm</span>
                <span className="text-[14px] text-redni">
                  {formatPrice(couponDetail.discount_value)}
                </span>
              </div>
            </div>
          )}
          <div className="border-b border-b-solid border-b-[#d9d9d9] py-[15px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#8f9bb3]">Tạm tính</span>
              <span className="text-[14px] text-[#8f9bb3]">
                {" "}
                {formatPrice(totalPrice || 0)}{" "}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#8f9bb3]">Phí vận chuyển</span>
              <span className="text-[14px] text-[#8f9bb3]">0đ</span>
            </div>
          </div>
          <div className="border-b border-b-solid py-[15px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#8f9bb3]">Tổng cộng</span>
              <span className=" text-blackni text-[20px]">
                <span className="text-[14px] uppercase text-vendor mr-3">
                  VND
                </span>
                {formatPrice(totalPrice || 0)}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {makeOrderMutation.isPending && (
        <div className="fixed  inset-0 z-[999] bg-transparent"></div>
      )}
    </CheckoutWrapper>
  );
};
const CheckoutWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 100vh;
  ul,
  li,
  a,
  div,
  span,
  p,
  h1,
  h2,
  h3 {
    font-family: "Helvetica Neue", sans-serif;
    font-weight: 500;
    line-height: 1.45;
    text-align: left;
  }
`;

export default CheckOut;
