import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { setLogginState } from "@/redux-toolkit/slice/auth.slice";
import { useDispatch } from "react-redux";
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
import useMessage from "@/hooks/useMessage";

import { logout } from "@/apis/auth";
const AccountMaster = () => {
  const dispatch = useDispatch();
  const messageApi = useMessage();

  const logoutMutate = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(setLogginState(false));
    },
    onError: () => {
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
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const handleLogOut = () => {
    logoutMutate.mutate();
  };
  return (
    <div className="mt-[30px] p-[20px]">
      <div className="flex items-start ">
        <div className="basis-1/4">
          <h3 className="text-[15px] uppercase text-redichi font-bold mb-[15px]">
            Tài khoản
          </h3>
          <ul className="list-outside ml-4">
            <li className="list-disc marker:text-redichi text-[14px] font-medium">
              <NavLink
                to={"/my-account"}
                className={({ isActive }) => {
                  return isActive && location.pathname == "/my-account"
                    ? " text-redichi "
                    : "text-[#333]";
                }}
              >
                Thông tin tài khoản
              </NavLink>{" "}
            </li>
            <li className="list-disc marker:text-redichi text-[14px] font-medium">
              <NavLink
                to={"/my-account/addresses"}
                className={({ isActive }) => {
                  return isActive ? " text-redichi " : "text-[#333]";
                }}
              >
                Danh sách địa chỉ
              </NavLink>{" "}
            </li>
            <li className="list-disc marker:text-redichi text-[14px] font-medium">
              <NavLink
                to={"/my-account/purchase"}
                className={({ isActive }) => {
                  return isActive ? " text-redichi " : "text-[#333]";
                }}
              >
                Đơn mua
              </NavLink>{" "}
            </li>
            <li className="list-disc marker:text-redichi text-[14px] font-medium">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="font-medium cursor-pointer text-[14px] ">
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
                    className={"flex items-center justify-center gap-[15px]"}
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
        </div>
        <div className="basis-3/4">
          <div className="mb-[20px] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMaster;
