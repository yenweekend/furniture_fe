import React from "react";
import { Outlet } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Master = () => {
  return (
    <div className="max-w-[1400px] mx-auto  ">
      <div className="-mx-[15px] flex">
        <div className="basis-3/4 mx-[15px]">
          <div className="px-[15px] bg-[#fff] shadow-card">
            <Outlet />
          </div>
        </div>
        <div className="basis-1/4 mx-[15px]">
          <div className=" bg-[#fff] shadow-card">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={
                    " text-[14px] font-bold text-redichi py-[15px] px-5 border-b-[1px] border-b-[#eee] border-solid"
                  }
                >
                  Các nội dung khác
                </AccordionTrigger>
                <AccordionContent className={" border-none"}>
                  <ul className=" ">
                    <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                      <a href="/" className="text-inherit font-normal">
                        {" "}
                        Chính sách bảo hành
                      </a>
                    </li>
                    <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                      <a href="/" className="text-inherit font-normal">
                        {" "}
                        Chi phí vận chuyển
                      </a>
                    </li>
                    <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                      <a href="/" className="text-inherit font-normal">
                        {" "}
                        Chính sách đổi trả và hoàn tiền
                      </a>
                    </li>
                    <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                      <a href="/" className="text-inherit font-normal">
                        {" "}
                        Chính sách vận chuyển và giao nhận
                      </a>
                    </li>
                    <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                      <a href="/" className="text-inherit font-normal">
                        {" "}
                        Các hình thức thanh toán
                      </a>
                    </li>
                    <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                      <a href="/" className="text-inherit font-normal">
                        {" "}
                        Chính sách bảo mật thông tin
                      </a>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Master;
