import React from "react";
import { Facebook, House, Mail, MapPin, Phone, Youtube } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Footer = () => {
  return (
    <footer className="bg-footerichi ">
      <div className=" py-5 border-y border-solid border-[rgba(51,51,51,0.04)] flex items-center max-w-[1400px] mx-auto">
        <div className="flex items-center px-[15px] justify-between w-full max-768:flex-col">
          <div className="flex max-768:items-center flex-col justify-start items-start">
            <h3 className="text-[#333] font-bold pr-[20px] text-[20px] max-990:text-[16px] max-990:mb-3">
              Đăng kí nhận tin
            </h3>
            <form className="flex items-center">
              <div className="relative h-10 max-990:flex-auto">
                <input
                  type="text"
                  placeholder="Nhập email của bạn"
                  className="outline-none pr-[100px] pl-[40px] py-[9px] border-[2px] border-shop rounded-full place placeholder:[#5c5c5c] text-[#5c5c5c]"
                />
                <div className="absolute center-y">
                  <Mail className="stroke-[#5c5c5c] ml-[14px]" size={14}></Mail>
                </div>
                <button className="top-0 bottom-0 right-0 center-y whitespace-nowrap  bg-footerhover rounded-full text-[#fff] text-[14px] px-3 text-center uppercase cursor-pointer font-bold h-10 hidden max-768:block ">
                  Đăng ký
                </button>
              </div>
              <button className="ml-5 px-[35px] py-[9px] whitespace-nowrap  bg-footerhover rounded-full text-[#fff] text-[14px] text-center uppercase cursor-pointer font-bold h-10 max-768:hidden">
                Đăng ký
              </button>
            </form>
          </div>
          <div className="flex items-center max-768:hidden md:block">
            <h3 className="text-[#333] font-bold pr-[20px] text-[20px]">
              Kết nối với chúng tôi
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="rounded-full cursor-pointer border border-black w-8 h-8 flex items-center justify-center"
              >
                <Facebook size={16} stroke="#333" />
              </a>
              <a
                href="/"
                className="rounded-full cursor-pointer border border-black w-8 h-8 flex items-center justify-center"
              >
                <Youtube size={16} stroke="#333" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[30px]  max-w-[1400px] mx-auto border-b border-solid border-b[rgba(51,51,51,0.04)]">
        <div className="flex items-stretch text-footertext  px-[15px]  max-990:hidden">
          <div className="basis-1/4 px-[15px] text-inherit flex flex-col">
            <h4 className="text-[18px] font-bold text-inherit pt-[15px] pb-[12px]">
              CÔNG TY CỔ PHẦN NỘI THẤT BAYA
            </h4>
            <ul className="">
              <li className="flex items-start gap-2">
                <span className="text-[14px] font-normal text-inherit">
                  <House size={22} className="inline  text-redichi mr-[6px]" />
                  BAYA Thủ Đức: 20 Nguyễn Cơ Thạch, P. An Lợi Đông, TP Thủ Đức.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[14px] font-normal text-inherit">
                  <MapPin size={22} className="inline text-redichi mr-[6px]" />
                  BAYA Hà Nội: Toà nhà Luxury Park Views, D32 KĐT mới Cầu Giấy,
                  đường Trương Công Giai, Yên Hoà, Cầu Giấy. Thời gian hoạt
                  động: 9h00 - 21h00 (kể cả CN và ngày lễ)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[14px] font-normal text-inherit">
                  <Phone size={22} className="inline  text-redichi mr-[6px]" />
                  1900 63 64 76
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[14px] font-normal text-inherit">
                  <Mail size={22} className="inline  text-redichi mr-[6px]" />
                  webshop@baya.vn
                </span>
              </li>
            </ul>
            <div className="pb-[20px] mt-2">
              <img
                src="	https://theme.hstatic.net/200000796751/1001266995/14/footer_logobct_img.png?v=82"
                alt=""
              />
            </div>
          </div>
          <div className="basis-1/4 px-[15px] text-inherit flex flex-col">
            <h4 className="text-[18px] font-bold text-inherit pt-[15px] pb-[12px]">
              Về BAYA
            </h4>
            <ul className="ml-5 list-outside ">
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a href="/pages/about-us" className="text-inherit font-normal">
                  {" "}
                  Giới thiệu
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a href="/pages/lien-he" className="text-inherit font-normal">
                  {" "}
                  Liên hệ
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/blogs/nguon-cam-hung"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Blog
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/he-thong-cua-hang"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Hệ thống cửa hàng
                </a>
              </li>
            </ul>
          </div>
          <div className="basis-1/4 px-[15px] text-inherit flex flex-col">
            <h4 className="text-[18px] font-bold text-inherit pt-[15px] pb-[12px]">
              Hỗ trợ khách hàng
            </h4>
            <ul className="ml-5 list-outside ">
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/dieu-khoan-dich-vu"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Câu hỏi thường gặp
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/huong-dan-dat-hang"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Hướng dẫn đặt hàng
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/mua-hang-tra-gop"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Mua hàng trả góp
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/huong-dan-dat-hang"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Hướng dẫn thanh toán VNPAY-QR
                </a>
              </li>
            </ul>
          </div>
          <div className="basis-1/4 px-[15px] text-inherit flex flex-col">
            <h4 className="text-[18px] font-bold text-inherit pt-[15px] pb-[12px]">
              Chính sách
            </h4>
            <ul className="ml-5 list-outside ">
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/chinh-sach-bao-hanh"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Chính sách bảo hành
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/chi-phi-van-chuyen"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Chi phí vận chuyển
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/chinh-sach-doi-tra"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Chính sách đổi trả và hoàn tiền
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/chinh-sach-van-chuyen-va-giao-nhan"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Chính sách vận chuyển và giao nhận
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/chinh-sach-thanh-toan"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Các hình thức thanh toán
                </a>
              </li>
              <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                <a
                  href="/pages/chinh-sach-bao-hanh"
                  className="text-inherit font-normal"
                >
                  {" "}
                  Chính sách bảo mật thông tin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex  text-footertext px-[15px] flex-col 2md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={
                  " text-[16px] font-bold text-blackni py-[15px]  border-b-[1px] border-b-[#e9e9e9] border-dashed"
                }
              >
                CÔNG TY CỔ PHẦN NỘI THẤT BAYA
              </AccordionTrigger>
              <AccordionContent className={" border-none pt-[10px] pb-5"}>
                <ul className="">
                  <li className="flex items-start gap-2">
                    <span className="text-[14px] font-normal text-inherit">
                      <House
                        size={22}
                        className="inline  text-redichi mr-[6px]"
                      />
                      BAYA Thủ Đức: 20 Nguyễn Cơ Thạch, P. An Lợi Đông, TP Thủ
                      Đức.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[14px] font-normal text-inherit">
                      <MapPin
                        size={22}
                        className="inline text-redichi mr-[6px]"
                      />
                      BAYA Hà Nội: Toà nhà Luxury Park Views, D32 KĐT mới Cầu
                      Giấy, đường Trương Công Giai, Yên Hoà, Cầu Giấy. Thời gian
                      hoạt động: 9h00 - 21h00 (kể cả CN và ngày lễ)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[14px] font-normal text-inherit">
                      <Phone
                        size={22}
                        className="inline  text-redichi mr-[6px]"
                      />
                      1900 63 64 76
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[14px] font-normal text-inherit">
                      <Mail
                        size={22}
                        className="inline  text-redichi mr-[6px]"
                      />
                      webshop@baya.vn
                    </span>
                  </li>
                </ul>
                <div className="pb-[20px] mt-2">
                  <img
                    src="	https://theme.hstatic.net/200000796751/1001266995/14/footer_logobct_img.png?v=82"
                    alt=""
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
              <AccordionTrigger
                className={
                  " text-[16px] font-bold text-blackni py-[15px]  border-b-[1px] border-b-[#e9e9e9] border-dashed"
                }
              >
                Về BAYA
              </AccordionTrigger>
              <AccordionContent className={" border-none pt-[10px] pb-5"}>
                <ul className="ml-5 list-outside ">
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/about-us"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Giới thiệu
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/lien-he"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Liên hệ
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/blogs/nguon-cam-hung"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Blog
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/he-thong-cua-hang"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Hệ thống cửa hàng
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-3">
              <AccordionTrigger
                className={
                  " text-[16px] font-bold text-blackni py-[15px]  border-b-[1px] border-b-[#e9e9e9] border-dashed"
                }
              >
                Hỗ trợ khách hàng
              </AccordionTrigger>
              <AccordionContent className={" border-none pt-[10px] pb-5"}>
                <ul className="ml-5 list-outside ">
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/dieu-khoan-dich-vu"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Câu hỏi thường gặp
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/huong-dan-dat-hang"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Hướng dẫn đặt hàng
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/mua-hang-tra-gop"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Mua hàng trả góp
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/huong-dan-dat-hang"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Hướng dẫn thanh toán VNPAY-QR
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-4">
              <AccordionTrigger
                className={
                  " text-[16px] font-bold text-blackni py-[15px]  border-b-[1px] border-b-[#e9e9e9] border-dashed"
                }
              >
                Chính sách
              </AccordionTrigger>
              <AccordionContent className={" border-none pt-[10px] pb-5"}>
                <ul className="ml-5 list-outside ">
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/chinh-sach-bao-hanh"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Chính sách bảo hành
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/chi-phi-van-chuyen"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Chi phí vận chuyển
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/chinh-sach-doi-tra"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Chính sách đổi trả và hoàn tiền
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/chinh-sach-van-chuyen-va-giao-nhan"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Chính sách vận chuyển và giao nhận
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/chinh-sach-thanh-toan"
                      className="text-inherit font-normal"
                    >
                      {" "}
                      Các hình thức thanh toán
                    </a>
                  </li>
                  <li className="text-[14px] mb-2  marker:text-[#000] hover:text-redni hover:marker:text-redni transition-all ease-linear duration-150 list-disc">
                    <a
                      href="/pages/chinh-sach-bao-hanh"
                      className="text-inherit font-normal"
                    >
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
      <div className="copy-right py-[15px] bg-footercopy text-footertitle text-center">
        Copyright © 2025 Baya. Powered by Haravan
      </div>
    </footer>
  );
};

export default Footer;
