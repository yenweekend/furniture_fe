import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/apis/auth";
import Loading from "@/containers/components/Loading";

const AccountInfo = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["account-info"],
    queryFn: getAccount,
  });
  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return error.message;
  }
  return (
    <>
      <div className="mb-[20px]">
        <h3 className="text-[15px] font-bold">Thông tin tài khoản</h3>
        <div className="flex items-center text-[14px]">
          <b>Tên người dùng:&nbsp; </b>
          <span>
            {data.data.account.firstName + " " + data.data.account.lastName}
          </span>
        </div>
        <div className="flex items-center text-[14px]">
          <b>Email:&nbsp; </b>
          <span>{data.data.account.email}</span>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
