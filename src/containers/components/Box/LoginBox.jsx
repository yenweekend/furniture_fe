import React, { useId } from "react";
import { useForm } from "react-hook-form";

const LoginBox = () => {
  const uniqueId = useId();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="pb-[10px]">
          <div
            className="relative mb-1 h-10"
            style={{
              boxShadow: "0 0 0 1px #d9d9d9",
            }}
          >
            <input
              type="text"
              autoComplete="off"
              {...register("email", {
                required: {
                  value: true,
                  message: "Vui lòng điền Email !",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không hợp lệ !",
                },
              })}
              id={`${uniqueId}-email`}
              className="peer w-full h-full py-[10px] px-5"
            />
            <label
              htmlFor={`${uniqueId}-email`}
              className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 ${
                dirtyFields.email
                  ? "text-[14px] -top-3 left-2 h-[20px] leading-[20px]"
                  : "text-[16px] top-0 left-3 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[14px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
              }
        `}
            >
              Email
            </label>
          </div>
          {errors?.email && (
            <p className="text-[13px] text-redni font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="pb-[10px]">
          <div
            className="relative mb-1 h-10"
            style={{
              boxShadow: "0 0 0 1px #d9d9d9",
            }}
          >
            <input
              type="text"
              autoComplete="off"
              {...register("password", {
                required: {
                  value: true,
                  message: "Vui lòng điền mật khẩu !",
                },
                minLength: {
                  value: 6,
                  message: "Mật khẩu ít nhất 6 kí tự !",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                  message: "Mật khẩu phải có ít nhất 1 ký tự in hoa, chữ số !",
                },
              })}
              id={`${uniqueId}-password`}
              className="peer w-full h-full py-[10px] px-5"
            />
            <label
              htmlFor={`${uniqueId}-password`}
              className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 ${
                dirtyFields.password
                  ? "text-[14px] -top-3 left-2 h-[20px] leading-[20px]"
                  : "text-[16px] top-0 left-3 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[14px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
              }
        `}
            >
              Mật khẩu
            </label>
          </div>
          {errors?.password && (
            <p className="text-[13px] text-redni font-medium">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      {/* {errors?.duplicate && (
  <p className="text-[13px] text-redni font-medium">
    {errors.duplicate.message}
  </p>
)} */}
      <p className="text-[13px] font-normal mt-1">
        This site is protected by reCAPTCHA and the Google
        <span className="text-[#2962ff] font-normal"> Privacy Policy</span>
        and
        <span className="text-[#2962ff] font-normal"> Terms of Service</span>
        apply .
      </p>

      <div className="flex flex-col">
        <button
          className={`text-[14px] text-[#fff] font-bold px-[20px] py-[10px] bg-redichi my-2 ${
            Object.keys(errors).length > 0 ? "disabled:opacity-25" : ""
          }`}
          type="submit"
        >
          Đăng nhập
        </button>
        <div className="">
          <p className="text-[13px] font-normal">
            Bạn chưa có tài khoản
            <a href="/account/register" className="text-redichi font-normal">
              {" "}
              Đăng kí tại đây
            </a>
          </p>
          <p className="text-[13px] font-normal">
            Bạn quên mật khẩu
            <a href="/account/login" className="text-redichi font-normal">
              {" "}
              Quên mật khẩu
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginBox;
