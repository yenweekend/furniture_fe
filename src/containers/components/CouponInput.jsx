import React, { useEffect, useId, useState } from "react";
import { setCouponDetail } from "@/redux-toolkit/slice/coupon.slice";
import { useDispatch, useSelector } from "react-redux";
import { couponCodeSelector } from "@/redux-toolkit/selector/couponSelector";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getCoupon } from "@/apis/order";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useMessage from "@/hooks/useMessage";

const CouponInput = ({ useFormMethods }) => {
  const messageApi = useMessage();
  const totalPrice = useSelector((state) => state.coupon.totalOrderPrice);
  const dispatch = useDispatch();
  const [disabled, setDisbled] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useFormMethods;
  const codeValue = watch("code");
  const { isPending, ...mutateCoupon } = useMutation({
    mutationFn: getCoupon,
    onSuccess: (response) => {
      dispatch(setCouponDetail(response.data.coupon));
      setDisbled(true);
    },
    onError: (error) => {
      setDisbled(true);
      messageApi.open({
        type: "error",
        content: error.response.data.msg || "Đã xảy ra lỗi",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const uniqueId = useId(); // Generate a unique ID for each instance
  const onSubmit = async (data) => {
    mutateCoupon.mutate({ code: data.code, totalPrice: totalPrice });
  };
  return (
    <div className="">
      <div className="border-b border-b-solid border-b-[#d9d9d9] py-[15px] flex items-stretch gap-2 flex-wrap">
        <div className="form-group min-w-[200px]">
          <div
            className="relative h-10"
            style={{
              boxShadow: "0 0 0 1px #d9d9d9",
            }}
          >
            <input
              type="text"
              value={codeValue}
              {...register("code", { required: true })}
              autoComplete="off"
              // name="coupon-field"
              id={uniqueId}
              className="peer w-full h-full py-[10px] px-5"
              onChange={(e) => {
                setValue("code", e.target.value, { shouldDirty: true });
                setDisbled(false);
                // dispatch(setCouponCode(e.target.value));
              }}
            />
            <label
              htmlFor={uniqueId}
              className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 
            ${
              isDirty
                ? "left-2 -top-3 text-[14px] h-[20px] leading-[20px]"
                : "text-[16px] top-0 left-3 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[14px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
            }
        `}
            >
              Mã giảm giá
            </label>
          </div>
        </div>

        {!isDirty || disabled ? (
          <button
            type="button"
            className="bg-[#c8c8c8] h-10 px-5 whitespace-nowrap text-[#fff] font-medium cursor-not-allowed"
          >
            Sử dụng
          </button>
        ) : isPending ? (
          <Button disabled className={"rounded-none bg-[#338dbc] h-10"}>
            <Loader2 className="animate-spin" />
            Vui lòng chờ
          </Button>
        ) : (
          <button
            type="button"
            className="bg-[#338dbc] px-5 whitespace-nowrap text-[#fff] font-medium h-10"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Sử dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default CouponInput;
