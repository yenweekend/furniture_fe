import React from "react";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "@/apis/auth";
import { useDispatch } from "react-redux";
import { setLogginState } from "@/redux-toolkit/slice/auth.slice";
import useMessage from "@/hooks/useMessage";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Login = () => {
  const messageApi = useMessage();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      navigate("/");
      dispatch(setLogginState(true));
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
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
    mutate(data);
  };
  return (
    <div className="max-w-[1400px] px-[15px] mx-auto">
      <div className=" pt-[25px] pb-[30px] px-[30px]  mx-auto mb-[50px]">
        <div className="max-w-[620px] mt-[35px] mx-auto mb-[50px] pt-[25px] pb-[30px] px-[30px] bg-[#fff]">
          <div className="mb-[45px] flex items-center justify-center ">
            <NavLink
              to="/account/login"
              className={({ isActive }) => {
                return (
                  "px-[30px] font-bold text-[24px] relative" +
                  (isActive ? "text-blackni" : "text-vendor")
                );
              }}
            >
              Đăng nhập
              <div className="absolute w-[2px] h-6 right-0 bg-[#eee]  center-y"></div>
            </NavLink>
            <NavLink
              to="/account/register"
              className={({ isActive }) => {
                return (
                  "px-[30px] font-bold text-[24px] " +
                  (isActive ? "text-blackni" : "text-vendor")
                );
              }}
            >
              Đăng ký
            </NavLink>
          </div>
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email không hợp lệ !",
                      },
                    })}
                    id="email"
                    className="peer w-full h-full py-[10px] px-5"
                  />
                  <label
                    htmlFor="email"
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
                      // pattern: {
                      //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                      //   message:
                      //     "Mật khẩu phải có ít nhất 1 ký tự in hoa, chữ số !",
                      // },
                    })}
                    id="password"
                    className="peer w-full h-full py-[10px] px-5"
                  />
                  <label
                    htmlFor="password"
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
              <span className="text-[#2962ff] font-normal">
                {" "}
                Privacy Policy
              </span>
              and
              <span className="text-[#2962ff] font-normal">
                {" "}
                Terms of Service
              </span>
              apply .
            </p>

            <div className="flex items-center mt-[15px]">
              {isPending ? (
                <Button
                  disabled
                  className={
                    "text-[#fff] text-center px-[20px] py-[10px] text-[14px] font-bold bg-redichi rounded-none"
                  }
                >
                  <Loader2 className="animate-spin" />
                  <span>Đăng nhập</span>
                </Button>
              ) : (
                <button
                  className={`text-[14px] text-[#fff] font-bold px-[20px] py-[10px] bg-redichi ${
                    Object.keys(errors).length > 0 ? "disabled:opacity-25" : ""
                  }`}
                  type="submit"
                >
                  Đăng nhập
                </button>
              )}
              <div className="pl-[30px]">
                <p className="text-[13px] font-normal">
                  Bạn chưa có tài khoản
                  <a
                    href="/account/register"
                    className="text-[#2962ff] font-normal"
                  >
                    {" "}
                    Đăng kí tại đây
                  </a>
                </p>
                <p className="text-[13px] font-normal">
                  Bạn quên mật khẩu
                  <a
                    href="/account/login"
                    className="text-[#2962ff] font-normal"
                  >
                    {" "}
                    Quên mật khẩu
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isPending && (
        <div className="fixed  inset-0 z-[999] bg-transparent"></div>
      )}
    </div>
  );
};

export default Login;
