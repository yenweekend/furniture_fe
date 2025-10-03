import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { cn } from "@/lib/utils";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../Dropdown/Dropdown";
import { ChevronDown, UserRound, X } from "lucide-react";
import {
  DropdownScreen,
  DropdownScreenContent,
  DropdownScreenTrigger,
} from "@/containers/components/Dropdown/DropdownFullScreen";
import { LoginBox } from "@/containers/components";
import { useDispatch, useSelector } from "react-redux";
import getFullName from "@/helpers/getName";
import { Link } from "react-router-dom";
import useMessage from "@/hooks/useMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/apis/auth";
import { setLogginState } from "@/redux-toolkit/slice/auth.slice";
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
export function AccountButton({ className }) {
  const messageApi = useMessage();
  const dispatch = useDispatch();
  const logoutMutate = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      // messageApi.open({
      //   type: "success",
      //   content: "Bạn đã đăng xuất thành công",
      //   className: "custom-class",
      //   style: {
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // });
      dispatch(setLogginState(false));
      onOpenChange(false);
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đăng xuất thất bại!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
    retry: false,
  });
  const [open, onOpenChange] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 990px)");
  React.useEffect(() => {
    if (open) {
      if (isDesktop) {
        if (document.body.classList.contains("locked-scroll")) {
          document.body.classList.remove("locked-scroll");
        }
      } else {
        document.body.classList.add("locked-scroll");
      }
    } else {
      document.body.classList.remove("locked-scroll");
    }
  }, [isDesktop, open]);
  const { account, loading, error } = useSelector((state) => state.auth); //checkAuth
  const handleLogOut = () => {
    logoutMutate.mutate();
  };

  if (error) {
    console.log("Người dùng hết phiên: ", error);
    if (isDesktop) {
      return (
        <button
          className="items-center justify-center flex  text-sm font-medium relative 2md:px-4 md:px-3 px-[8px] text-[#fff] "
          onClick={() => {
            messageApi.open({
              type: "error",
              content: "Phiên đăng nhập đã hết hạn!",
              className: "custom-class",
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            });
          }}
        >
          <div className="items-center  flex py-[9px]">
            <span className="w-6 h-6">
              <UserRound size={30} strokeWidth={1} />
            </span>

            <span className="box-text ml-[10px] text-left font-light max-990:hidden whitespace-nowrap">
              Đăng nhập/ Đăng ký
              <span className=" flex items-center gap-1 whitespace-nowrap">
                Tài khoản của tôi
                <ChevronDown className="text-[#fff]" size={16}></ChevronDown>
              </span>
            </span>
          </div>
        </button>
      );
    } else {
      return (
        <UserRound
          size={20}
          className={`text-[#fff] transition-  center-xabsolute ease-linear duration-150  
          visible opacity-1 h2
      }`}
          strokeWidth={1.5}
        />
      );
    }
  }
  if (isDesktop) {
    if (loading) {
      return (
        <button className="items-center justify-center flex  text-sm font-medium relative 2md:px-4 md:px-3 px-[8px] text-[#fff] ">
          <a className="items-center  flex py-[9px]">
            <span className="w-6 h-6">
              <UserRound size={30} strokeWidth={1} />
            </span>
            {account ? (
              <span className="box-text ml-[10px] text-left font-light max-990:hidden whitespace-nowrap">
                Tài khoản của
                <span className=" flex items-center gap-1 whitespace-nowrap">
                  {getFullName(account.firstName, account.lastName)}
                  <ChevronDown className="text-[#fff]" size={16}></ChevronDown>
                </span>
              </span>
            ) : (
              <span className="box-text ml-[10px] text-left font-light max-990:hidden whitespace-nowrap">
                Đăng nhập/ Đăng ký
                <span className=" flex items-center gap-1 whitespace-nowrap">
                  Tài khoản của tôi
                  <ChevronDown className="text-[#fff]" size={16}></ChevronDown>
                </span>
              </span>
            )}
          </a>
        </button>
      );
    }
    return (
      <Dropdown open={open} onOpenChange={onOpenChange}>
        <DropdownTrigger className={"text-[#fff] mx-[2px] 2md:px-4"}>
          <a className="items-center  flex py-[9px]">
            <span className="w-6 h-6">
              <UserRound size={30} strokeWidth={1} />
            </span>
            {account ? (
              <span className="box-text ml-[10px] text-left font-light max-990:hidden whitespace-nowrap">
                Tài khoản của
                <span className=" flex items-center gap-1 whitespace-nowrap">
                  {getFullName(account.firstName, account.lastName)}
                  <ChevronDown className="text-[#fff]" size={16}></ChevronDown>
                </span>
              </span>
            ) : (
              <span className="box-text ml-[10px] text-left font-light max-990:hidden whitespace-nowrap">
                Đăng nhập/ Đăng ký
                <span className=" flex items-center gap-1 whitespace-nowrap">
                  Tài khoản của tôi
                  <ChevronDown className="text-[#fff]" size={16}></ChevronDown>
                </span>
              </span>
            )}
          </a>
        </DropdownTrigger>
        <DropdownContent className={"py-[15px] px-[24px] w-[400px]"}>
          {account ? (
            <>
              <div className="text-center pb-[8px] mb-[20px] border-b border-solid border-shop ">
                <h2 className="text-[15px] uppercase font-medium text-redichi ">
                  Thông tin tài khoản
                </h2>
              </div>
              <ul>
                <li className="mb-[8px]">
                  <span className="text-[15px] ">
                    {getFullName(account.firstName, account.lastName)}
                  </span>
                </li>
                <li className="relative pl-[10px] mb-[10px] after:content-[''] after:absolute after:h-[4px] after:w-[4px] after:bg-[--shop-color-text] after:rounded-full after:left-0 after:top-[5px]">
                  <Link
                    to="/my-account"
                    className="font-normal cursor-pointer text-[14px] px-[4px]"
                    onClick={() => {
                      onOpenChange(false);
                    }}
                  >
                    Tài khoản của tôi
                  </Link>
                </li>
                <li className="relative pl-[10px] mb-[10px] after:content-[''] after:absolute after:h-[4px] after:w-[4px] after:bg-[--shop-color-text] after:rounded-full after:left-0 after:top-[5px]">
                  <Link
                    to="/my-account/addresses"
                    className="font-normal cursor-pointer text-[14px] px-[4px]"
                    onClick={() => {
                      onOpenChange(false);
                    }}
                  >
                    Danh sách địa chỉ
                  </Link>
                </li>
                <li className="relative pl-[10px] mb-[10px] after:content-[''] after:absolute after:h-[4px] after:w-[4px] after:bg-[--shop-color-text] after:rounded-full after:left-0 after:top-[5px]">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="font-normal cursor-pointer text-[14px] px-[4px] ">
                        Đăng xuất
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className={"z-[112]"}>
                      <AlertDialogHeader>
                        <AlertDialogTitle className={"hidden"}>
                          Bạn có chắc muốn đăng xuất khỏi website
                        </AlertDialogTitle>
                        <AlertDialogDescription className={"text-center"}>
                          Bạn có chắc muốn đăng xuất khỏi website
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
                            handleLogOut();
                          }}
                        >
                          đồng ý
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="text-center pb-[8px] mb-[20px] border-b border-solid border-shop ">
                <h2 className="text-[15px] uppercase font-medium text-redichi ">
                  Đăng nhập tài khoản
                </h2>
                <p className="text-[#677279] font-normal text-[14px] text-center">
                  Nhập email và mật khẩu của bạn:
                </p>
              </div>
              <LoginBox />
            </>
          )}
        </DropdownContent>
      </Dropdown>
    );
  }
  if (loading) {
    return (
      <div
        className="px-3
      "
      >
        <UserRound
          size={20}
          className={`text-[#fff] transition-  center-xabsolute ease-linear duration-150  
            visible opacity-1  
        }`}
          strokeWidth={1.5}
        />
      </div>
    );
  }
  return (
    <DropdownScreen open={open} onOpenChange={onOpenChange}>
      <DropdownScreenTrigger className={" flex 2md:hidden"}>
        <X
          size={20}
          className={`text-[#fff] transition-all center-x absolute ease-linear duration-150   ${
            open
              ? " visible scale-100 opacity-100 "
              : "invisible opacity-0 scale-90  "
          }`}
          strokeWidth={1.5}
        />
        <UserRound
          size={20}
          className={`text-[#fff] transition-  center-xabsolute ease-linear duration-150   ${
            open
              ? " invisible opacity-0 scale-90  "
              : "visible opacity-1 scale-100 "
          }`}
          strokeWidth={1.5}
        />
      </DropdownScreenTrigger>
      <DropdownScreenContent className={cn("", className)}>
        <div className="absolute inset-0 ">
          <div className="w-full h-full overflow-y-auto pb-[30px]">
            <div className="w-full h-full py-[15px] px-5">
              {account ? (
                <>
                  <div className="text-center pb-[8px] mb-[20px] border-b border-solid border-shop ">
                    <h2 className="text-[15px] uppercase font-medium text-redichi ">
                      Thông tin tài khoản
                    </h2>
                  </div>
                  <ul>
                    <li className="mb-[8px]">
                      <span className="text-[15px] ">
                        {" "}
                        {getFullName(account.firstName, account.lastName)}
                      </span>
                    </li>
                    <li className="relative pl-[10px] mb-[10px] after:content-[''] after:absolute after:h-[4px] after:w-[4px] after:bg-[--shop-color-text] after:rounded-full after:left-0 after:top-[5px]">
                      <Link
                        to="/my-account"
                        className="font-normal cursor-pointer text-[14px] px-[4px]"
                        onClick={() => {
                          onOpenChange(false);
                        }}
                      >
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li className="relative pl-[10px] mb-[10px] after:content-[''] after:absolute after:h-[4px] after:w-[4px] after:bg-[--shop-color-text] after:rounded-full after:left-0 after:top-[5px]">
                      <Link
                        to="/my-account/addresses"
                        className="font-normal cursor-pointer text-[14px] px-[4px]"
                        onClick={() => {
                          onOpenChange(false);
                        }}
                      >
                        Danh sách địa chỉ
                      </Link>
                    </li>
                    <li className="relative pl-[10px] mb-[10px] after:content-[''] after:absolute after:h-[4px] after:w-[4px] after:bg-[--shop-color-text] after:rounded-full after:left-0 after:top-[5px]">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="font-normal cursor-pointer text-[14px] px-[4px] ">
                            Đăng xuất
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className={"z-[102]"}>
                          <AlertDialogHeader>
                            <AlertDialogTitle className={"hidden"}>
                              Bạn có chắc muốn đăng xuất khỏi website
                            </AlertDialogTitle>
                            <AlertDialogDescription className={"text-center"}>
                              Bạn có chắc muốn đăng xuất khỏi website
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
                                handleLogOut();
                              }}
                            >
                              đồng ý
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="text-center pb-[8px] mb-[20px] border-b border-solid border-shop ">
                    <h2 className="text-[15px] uppercase font-medium text-redichi ">
                      Đăng nhập tài khoản
                    </h2>
                    <p className="text-[#677279] font-normal text-[14px] text-center">
                      Nhập email và mật khẩu của bạn:
                    </p>
                  </div>
                  <LoginBox />
                </>
              )}
            </div>
          </div>
        </div>
      </DropdownScreenContent>
    </DropdownScreen>
  );
}
