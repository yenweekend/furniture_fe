import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "./Dropdown/Dropdown";
import { update } from "@/apis/address";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useMessage from "@/hooks/useMessage";
import { getDistrict, getWard, getAny } from "@/apis/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Address = ({ data, province, setDefault = true }) => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();
  const [tab, setTab] = useState("province");
  const [districtList, setDistrictList] = useState(null);
  const [wardList, setWardList] = useState(null);
  const [provinceValue, setProvinceValue] = useState(null);
  const [districtValue, setDistrictValue] = useState(null);
  const [wardValue, setWardValue] = useState(null);
  const [open, onOpenChange] = useState(false);
  const [openPopOver, onOpenPopOverChange] = useState(false);
  const {
    register,
    formState,
    getValues,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm();

  const fullName = watch("full_name");
  const phoneNumber = watch("phone_number");
  const address = watch("address");
  const addressDetail = watch("address_detail");

  const mutateDistrict = useMutation({
    mutationFn: getDistrict,
    onSuccess: (response) => {
      setDistrictList(response.data.data);

      setTab("district");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đã có lỗi lấy dữ liệu huyện",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const mutateWard = useMutation({
    mutationFn: getWard,
    onSuccess: (response) => {
      setWardList(response.data.data);
      setTab("ward");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đã có lỗi lấy dữ liệu danh sách phường,xã",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const mutateAny = useMutation({
    mutationFn: getAny,
    onSuccess: (response) => {
      setValue("address", response.data.data.full_name, { shouldDirty: true });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đã có lỗi lấy địa chỉ người mua",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const mutateUpdateAddress = useMutation({
    mutationFn: update,
    onSuccess: (response) => {
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["purchase-info"] });
      messageApi.open({
        type: "success",
        content: "Cập nhật địa chỉ thành công !",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đã có lỗi khi cập nhật địa chỉ",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const handleOpenChange = (isOpen) => {
    if (isOpen && data) {
      setDistrictList(null);
      setWardList(null);
      setProvinceValue(null);
      setDistrictValue(null);
      setWardValue(null);
      setTab("province");
      reset({
        full_name: data.full_name || "",
        address_detail: data.address_detail || "",
        address: data.address || "",
        phone_number: data.phone_number || "",
      });
    }
    onOpenChange(isOpen);
  };
  const onSubmit = () => {
    const updatedData = Object.keys(formState.dirtyFields).reduce(
      (acc, key) => {
        const value = getValues(key);
        if (value.trim() !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    mutateUpdateAddress.mutate({ id: data.id, formData: updatedData });
  };
  return (
    <div className="flex items-center text-[14px] p-4 bg-[#fff] justify-between flex-auto">
      <div className="flex flex-col text-vendor text-[14px]">
        <div className="flex items-center">
          <span className="text-[#333] font-bold">{data.full_name}</span>{" "}
          <Separator
            orientation="vertical"
            className={`h-6  bg-[#333] mx-3 w-[0.4px]`}
          />
          <span>(+84) {data.phone_number}</span>
        </div>
        <p className="">{data.address_detail}</p>
        <p className="">{data.address}</p>
        {data.on_used && (
          <div className=" w-fit mt-3 py-1  px-3 border border-solid border-redichi text-redichi text-[14px] font-medium">
            Mặc định
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end items-end">
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button
              className={`text-[14px] cursor-pointer text-[#5760fb] font-medium`}
              variant="outline"
            >
              Cập nhật
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px]"
            onInteractOutside={(e) => e.preventDefault()} // Prevent closing on overlay click
          >
            <DialogHeader>
              <DialogTitle>Cập nhật địa chỉ</DialogTitle>
            </DialogHeader>
            <div className="flex gap-3">
              <div className="form-group border border-solid border-[#333] basis-1/2">
                <div
                  className="relative h-10"
                  style={{
                    boxShadow: "0 0 0 1px #d9d9d9",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    {...register("full_name", { required: true })}
                    className="peer w-full h-full p-[10px] text-[14px]  outline-none border-none"
                  />
                  <label
                    className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 
                    ${
                      fullName
                        ? "left-2 -top-3 text-[13px] h-[20px] leading-[20px]"
                        : "text-[14px] top-0 left-0 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[13px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
                    }
                `}
                  >
                    Họ và tên
                  </label>
                </div>
              </div>
              <div className="form-group border border-solid border-[#333] basis-1/2 ">
                <div
                  className="relative h-10"
                  style={{
                    boxShadow: "0 0 0 1px #d9d9d9",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    {...register("phone_number", { required: true })}
                    className="peer w-full h-full p-[10px] text-[14px]  outline-none border-none"
                  />
                  <label
                    className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 
                    ${
                      phoneNumber
                        ? "left-2 -top-3 text-[13px] h-[20px] leading-[20px]"
                        : "text-[14px] top-0 left-0 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[13px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
                    }
                `}
                  >
                    Số điện thoại
                  </label>
                </div>
              </div>
            </div>

            <Dropdown
              onOpenChange={onOpenPopOverChange}
              open={openPopOver}
              className={"block"}
            >
              <DropdownTrigger
                className={
                  "w-full flex-auto block px-0 border border-solid border-[#333]"
                }
              >
                <div
                  className="relative w-full flex-auto"
                  style={{
                    boxShadow: "0 0 0 1px #d9d9d9",
                  }}
                >
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    readOnly
                    className="peer w-full h-full p-[10px] text-[14px]  outline-none border-none relative address-input"
                    autoComplete="off"
                  />
                  <label
                    className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 
                    ${
                      address
                        ? "left-2 -top-3 text-[13px] h-[20px] leading-[20px]"
                        : "text-[14px] top-0 left-0 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[13px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
                    }
                `}
                  >
                    Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã
                  </label>
                </div>
              </DropdownTrigger>
              <DropdownContent
                arrow={false}
                className={
                  "w-[400px] left-[50%] translate-x-[-50%] top-[100%] rounded-sm"
                }
              >
                <div className="api-tinh-thanh h-full">
                  <Tabs
                    defaultValue={"province"}
                    value={tab}
                    className="h-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        className={"pb-2"}
                        value="province"
                        onClick={() => setTab("province")}
                      >
                        Tỉnh/Thành phố
                      </TabsTrigger>
                      <TabsTrigger
                        className={"pb-2"}
                        value="district"
                        onClick={() => setTab("district")}
                        disabled={!districtList}
                      >
                        Quận/Huyện
                      </TabsTrigger>
                      <TabsTrigger
                        className={"pb-2"}
                        value="ward"
                        disabled={!wardList}
                        onClick={() => setTab("ward")}
                      >
                        Phường/Xã
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      className={"bottom-overlay relative"}
                      value="province"
                    >
                      <Command>
                        <CommandInput placeholder="Tìm kiếm tỉnh/thành..." />
                        <CommandList className={`max-h-[222px]`}>
                          <CommandEmpty>Không có dữ liệu.</CommandEmpty>
                          <CommandGroup>
                            {province.map((p) => (
                              <CommandItem
                                key={p.id}
                                value={p}
                                className={cn(
                                  "border border-solid border-transparent",
                                  provinceValue === p.full_name
                                    ? "border-redichi text-redichi"
                                    : ""
                                )}
                                onSelect={(currentValue) => {
                                  if (provinceValue !== currentValue) {
                                    setProvinceValue(currentValue);
                                    setDistrictList(null);
                                    setWardList(null);
                                    mutateDistrict.mutate(p.id);
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    provinceValue === p.full_name
                                      ? "opacity-100 text-redichi"
                                      : "opacity-0"
                                  )}
                                />
                                {p.full_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </TabsContent>
                    <TabsContent
                      className={"bottom-overlay relative"}
                      value="district"
                    >
                      {districtList && (
                        <Command>
                          <CommandInput placeholder="Tìm kiếm quận/huyện..." />
                          <CommandList className={`max-h-[222px]`}>
                            <CommandEmpty>Không có dữ liệu.</CommandEmpty>
                            <CommandGroup>
                              {districtList.map((d) => (
                                <CommandItem
                                  className={cn(
                                    "border border-solid border-transparent",
                                    districtValue === d.full_name
                                      ? "border-redichi text-redichi"
                                      : ""
                                  )}
                                  key={d.id}
                                  value={d}
                                  onSelect={(currentValue) => {
                                    if (districtValue !== currentValue) {
                                      setWardList(null);
                                      setDistrictValue(currentValue);
                                      mutateWard.mutate(d.id);
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      districtValue === d.full_name
                                        ? "opacity-100 text-redichi"
                                        : "opacity-0"
                                    )}
                                  />
                                  {d.full_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      )}
                    </TabsContent>
                    <TabsContent
                      className={"bottom-overlay relative"}
                      value="ward"
                    >
                      {" "}
                      {wardList && (
                        <Command>
                          <CommandInput placeholder="Tìm kiếm phường/xã..." />
                          <CommandList className={`max-h-[222px]`}>
                            <CommandEmpty>Không có dữ liệu.</CommandEmpty>
                            <CommandGroup>
                              {wardList.map((w) => (
                                <CommandItem
                                  key={w.id}
                                  value={w}
                                  className={cn(
                                    "border border-solid border-transparent",
                                    wardValue === w.full_name
                                      ? "border-redichi text-redichi"
                                      : ""
                                  )}
                                  onSelect={(currentValue) => {
                                    if (wardValue !== currentValue) {
                                      onOpenPopOverChange(false);
                                      setWardValue(currentValue);
                                      mutateAny.mutate(w.id);
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      wardValue === w.full_name
                                        ? "opacity-100 text-redichi"
                                        : "opacity-0"
                                    )}
                                  />
                                  {w.full_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </DropdownContent>
            </Dropdown>

            <div className="form-group border border-solid border-[#333] basis-1/2 ">
              <div
                className="relative h-10"
                style={{
                  boxShadow: "0 0 0 1px #d9d9d9",
                }}
              >
                <input
                  type="text"
                  autoComplete="off"
                  {...register("address_detail", { required: true })}
                  className="peer w-full h-full p-[10px] text-[14px]  outline-none border-none"
                />
                <label
                  className={`absolute text-vendor transition-all ease-linear duration-75  bg-[#fff] px-2 h-10 
                    ${
                      addressDetail
                        ? "left-2 -top-3 text-[13px] h-[20px] leading-[20px]"
                        : "text-[14px] top-0 left-0 peer-focus:left-2  peer-focus:-top-3 peer-focus:text-[13px]  peer-focus:h-[20px] peer-focus:leading-[20px] leading-[40px]"
                    }
                `}
                >
                  Địa chỉ cụ thể
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="primary"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Trở lại
              </Button>
              {!formState.isDirty ||
              Object.keys(formState.dirtyFields).some(
                (field) => getValues(field)?.trim() == ""
              ) ? (
                <Button disabled>Hoàn thành</Button>
              ) : mutateUpdateAddress.isPending ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={``}
                  onClick={() => {
                    handleSubmit(onSubmit)(); // onOpenChange(false);
                  }}
                >
                  Hoàn thành
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {}
        {setDefault && (
          <button className=" w-fit mt-3 py-1  px-3 border border-solid border-redichi text-redichi text-[14px] font-medium">
            Thiết lập mặc định
          </button>
        )}
      </div>
    </div>
  );
};

export default Address;
