import React from "react";
import icons from "@/utils/icons";
import {
  Twitter,
  Facebook,
  Link as LinkIcon,
  Gift,
  Minus,
  Plus,
  Ticket,
} from "lucide-react";
const ProductDetail = () => {
  return (
    <div className="flex 2md:gap-[12px] 2md:items-stretch  2md:flex-row flex-col  animate-pulse">
      <div className="2md:basis-45 flex-grow-0 w-full">
        <div className=" pb-[100%] w-full h-0 sticky top-0 bg-[#fff]">
          <div className="absolute w-full h-full flex flex-col justify-between">
            <div className=" w-full  flex  flex-row-reverse  ">
              {" "}
              <div className="flex-1 p-4">
                <div
                  className={
                    " pb-[100%] relative overflow-hidden flex-auto w-full "
                  }
                >
                  <div className="absolute inset-0">
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-sm ">
                      <svg
                        className="w-10 h-10 text-gray-300 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow-0 2md:w-[80px] pt-3 w-[76px] flex-shrink-0 px-3 flex-col ">
                <svg
                  className="mb-2 text-gray-100 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <svg
                  className="mb-2 text-gray-100 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <svg
                  className="mb-2 text-gray-100 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center mb-3">
              Chia sẻ:
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#25479b] flex items-center justify-center"
              >
                <Facebook size={16} fill="#fff" stroke="#fff" />
              </a>
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#0084ff] flex items-center justify-center"
              >
                <icons.messenger
                  fill="#fff"
                  stroke="#fff"
                  size={16}
                ></icons.messenger>
              </a>
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#55acee] flex items-center justify-center"
              >
                <Twitter size={16} fill="#fff" stroke="#fff" />
              </a>
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#cd242a] flex items-center justify-center"
              >
                <icons.pinterest
                  fill="#fff"
                  stroke="#fff"
                  size={16}
                ></icons.pinterest>
              </a>
              <button
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#929292] flex items-center justify-center"
              >
                <LinkIcon size={16} stroke="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="2md:basis-55 w-full">
        <div className=" bg-[#fff]   p-[15px]">
          <div className=" w-[80%] bg-gray-200 rounded-full h-4 space-y-2 mb-2"></div>
          <div className="flex flex-wrap items-center product-origin mb-[15px] gap-2">
            <div className="h-2 bg-gray-200 rounded-full basis-1/4"></div>
            <div className="devide bg-[rgba(0,0,0,.06)] w-[0.8px] h-[10px]"></div>
            <div className="h-2 bg-gray-200 rounded-full basis-1/4"></div>
            <div className="devide bg-[rgba(0,0,0,.06)] w-[0.8px] h-[10px]"></div>

            <div className="h-2 bg-gray-200 rounded-full basis-1/4"></div>
          </div>
          <div className=" w-full bg-gray-200   h-[100px]  flex items-center p-[15px] mb-[15px]"></div>
          <div className="flex items-start my-[15px]">
            <div className=" flex-col flex pr-[20px]">
              <div className="h-3 bg-gray-200 rounded-full w-[100px] mb-1"></div>
              <div className="h-3 bg-gray-200 rounded-full w-[60px]"></div>
            </div>
            <div className="grid grid-cols-5 h-3 flex-1 gap-x-3">
              <div className="col-span-1 h-8 bg-gray-200 rounded-full"></div>
              <div className="col-span-1 h-8 bg-gray-200 rounded-full"></div>
              <div className="col-span-1 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          {/* <div className="h-10 bg-gray-200 w-full flex items-center pr-5">
            <Gift className="stroke-gray-400 ml-auto" />
          </div> */}
          <div className="flex items-center mt-[15px]">
            <span className="skeleton h-3  mr-3 w-[100px]"></span>
            <div className="skeleton h-8  w-[120px]  "></div>
          </div>
          <div className="warranty flex md:items-center gap-3 mt-[15px] md:flex-row flex-col">
            <div className="basis-1/3 flex items-center gap-2">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-3 flex-auto">
                <span className="h-3 skeleton  "></span>
                <span className="h-3 skeleton w-[50%] "></span>
              </div>
            </div>
            <div className="basis-1/3 flex items-center gap-2">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-3 flex-auto">
                <span className="h-3 skeleton  "></span>
                <span className="h-3 skeleton w-[50%] "></span>
              </div>
            </div>
            <div className="basis-1/3 flex items-center gap-2">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-3 flex-auto">
                <span className="h-3 skeleton  "></span>
                <span className="h-3 skeleton w-[50%] "></span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[15px] gap-3">
            <div className="basis-1/2 2md:block hidden h-10 bg-gray-200"></div>
            <div className="basis-1/2 bg-gray-200 h-10"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-[#fff] mt-[15px] p-[15px] min-h-[200px]">
          <div className=" col-span-1  flex items-center">
            <div
              className={
                " w-full border border-solid border-[rgba(0,0,0,0.08)] rounded-[15px] flex "
              }
            >
              <div className="basis-3/10 p-2 border-r border-dashed border-shop coupon-left">
                <div className="w-full pb-[100%] relative rounded-[12px] overflow-hidden">
                  <div className="absolute inset-0 p-[10px]">
                    <svg
                      className="w-full h-full text-gray-300 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="basis-7/10 text-coupontext flex justify-between flex-col p-[10px]">
                <div className="relative">
                  <h3 className=" skeleton h-3 mb-2 w-[60%]"></h3>
                  <p className="skeleton h-2 w-[40%]"></p>
                </div>
                <div className="flex flex-col gap-2 max-990:gap-2">
                  <p className="skeleton h-2 w-full"></p>
                  <p className="skeleton h-2 w-full"></p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-1  flex items-center">
            <div
              className={
                " w-full border border-solid border-[rgba(0,0,0,0.08)] rounded-[15px] flex "
              }
            >
              <div className="basis-3/10 p-2 border-r border-dashed border-shop coupon-left">
                <div className="w-full pb-[100%] relative rounded-[12px] overflow-hidden">
                  <div className="absolute inset-0 p-[10px]">
                    <svg
                      className="w-full h-full text-gray-300 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="basis-7/10 text-coupontext flex justify-between flex-col p-[10px]">
                <div className="relative">
                  <h3 className=" skeleton h-3 mb-2 w-[60%]"></h3>
                  <p className="skeleton h-2 w-[40%]"></p>
                </div>
                <div className="flex flex-col gap-2 max-990:gap-2">
                  <p className="skeleton h-2 w-full"></p>
                  <p className="skeleton h-2 w-full"></p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-1  flex items-center">
            <div
              className={
                " w-full border border-solid border-[rgba(0,0,0,0.08)] rounded-[15px] flex "
              }
            >
              <div className="basis-3/10 p-2 border-r border-dashed border-shop coupon-left">
                <div className="w-full pb-[100%] relative rounded-[12px] overflow-hidden">
                  <div className="absolute inset-0 p-[10px]">
                    <svg
                      className="w-full h-full text-gray-300 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="basis-7/10 text-coupontext flex justify-between flex-col p-[10px]">
                <div className="relative">
                  <h3 className=" skeleton h-3 mb-2 w-[60%]"></h3>
                  <p className="skeleton h-2 w-[40%]"></p>
                </div>
                <div className="flex flex-col gap-2 max-990:gap-2">
                  <p className="skeleton h-2 w-full"></p>
                  <p className="skeleton h-2 w-full"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] mt-[15px] p-[15px]">
          <div className="flex gap-3 items-center border-b-[2px] py-3 border-[#eee] ">
            <div className="basis-1/4 skeleton h-5"></div>
            <div className="basis-1/3 skeleton h-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
