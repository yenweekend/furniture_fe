import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/apis/auth";
import { getProvince } from "@/apis/address";
import AddressComponent from "@/containers/components/Address";

const Address = () => {
  const getProvinceQuery = useQuery({
    queryKey: ["province"],
    queryFn: getProvince,
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["addresses-list"],
    queryFn: getAddresses,
  });
  if (isPending || getProvinceQuery.isPending) {
    return "loading";
  }
  if (isError || getProvinceQuery.isError) {
    return error.message || getProvinceQuery.error.message;
  }
  return (
    <>
      <div className="flex items-center justify-between bg-[#fff] p-4 mb-[15px]">
        <h3 className="text-[20px] font-bold">Địa chỉ của tôi</h3>
        <button className="w-fit mt-3 py-1  px-3 border border-solid border-redichi text-[14px] font-medium bg-redichi text-[#fff]">
          Thêm địa chỉ mới
        </button>
      </div>
      {data.data.data.map((address) => (
        <AddressComponent
          data={address}
          key={address.id}
          province={getProvinceQuery.data.data.data}
        />
      ))}
    </>
  );
};

export default Address;
