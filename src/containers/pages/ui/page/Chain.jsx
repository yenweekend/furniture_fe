import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
const Chain = () => {
  React.useEffect(() => {
    document.title = "Hệ thống cửa hàng - Siêu thị nội thất và trang trí Baya";
  }, []);
  return (
    <div className="max-w-[1400px] mx-auto py-[25px] px-[30px] bg-[#fff] ">
      <div className="">
        <h1 className="text-redichi text-[30px] font-bold text-center mb-5">
          {" "}
          Hệ thống cửa hàng
        </h1>
        <div className="flex items-stretch -mx-[20px]">
          <div className="basis-1/3 px-5  ">
            <div className="px-5 py-[25px] shadow-card border border-solid border-[rgba(0,0,0,0.08)]">
              <h1 className="text-redichi text-[20px] font-bold mb-5">
                {" "}
                Tìm cửa hàng
              </h1>
              <div className="mb-[15px]">
                <label htmlFor="" className="text-[14px] mb-[10px] block">
                  Chọn tỉnh thành
                </label>
                <Select defaultValue="hn">
                  <SelectTrigger className="w-full rounded-none border border-solid border-[#d9d9d9] bg-[#fff]  relative text-[14px] ">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className={
                      "border border-solid border-[#d9d9d9] bg-[#fff] "
                    }
                  >
                    <SelectItem value="hn">Hà Nội</SelectItem>
                    <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-[15px]">
                <label htmlFor="" className="text-[14px] mb-[10px] block">
                  Chọn cửa hàng
                </label>
                <Select defaultValue="caugiay">
                  <SelectTrigger className="w-full rounded-none border border-solid border-[#d9d9d9] bg-[#fff]  relative text-[14px] ">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className={
                      "border border-solid border-[#d9d9d9] bg-[#fff] "
                    }
                  >
                    <SelectItem value="caugiay">Cầu Giấy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-[25px] pl-[30px] relative">
                <div className="absolute top-0 left-0">
                  <MapPin size={20} />
                </div>
                <h3 className="text-redichi text-[16px] mb-[5px] font-bold">
                  BAYA Hà Nội
                </h3>
                <p className="font-normal mb-[5px]">
                  Toà nhà Luxury Park Views, D32 KĐT mới Cầu Giấy, đường Trương
                  Công Giai, Yên Hoà, Cầu Giấy
                </p>

                <p className="font-normal mb-[5px]">
                  Thời gian hoạt động:{" "}
                  <strong>9h00 - 21h00 (kể cả CN và ngày lễ)</strong>
                </p>
                <p className="font-normal mb-[5px]">
                  Điện thoại: <strong>(+8424) 3787 7286</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="basis-2/3  px-[20px] ">
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3578.7009675192567!2d105.791334!3d21.025618!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86eedb2f5f%3A0xe54aaab54f5328b5!2sLuxury%20Park%20Views!5e1!3m2!1svi!2sus!4v1737641295134!5m2!1svi!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chain;
