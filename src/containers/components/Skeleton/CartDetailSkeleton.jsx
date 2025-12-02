import React from "react";

const CartDetailSkeleton = () => {
  return (
    <div className="max-w-[1400px] 2md:px-[15px] mx-auto flex 2md:flex-row flex-col 2md:items-stretch animate-pulse">
      <div className="2md:basis-2/3  2md:px-[15px] flex-shrink-0">
        <div className="w-full bg-[#fff] px-4 pt-2">
          <h3 className="w-[60%] bg-gray-300 h-5"></h3>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="flex items-center gap-3" key={index}>
                <div className="  rounded-sm ">
                  <svg
                    className="w-20 h-20 text-gray-300 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="flex-auto flex flex-col gap-2">
                  <p className="bg-gray-300 h-3 w-[60%]"></p>
                  <p className="bg-gray-300 h-3 w-[10%]"></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" 2md:basis-1/3 2md:max-w-[33.33333%]  2md:px-[15px] flex-grow-0 flex-shrink-0  px-4 pt-2">
        <div className="bg-[#fff] mb-3 px-3">
          <h3 className="w-[60%] bg-gray-300 h-5 mb-3"></h3>
          <button className="w-full h-5 bg-gray-300"></button>
        </div>
        <div className="bg-[#fff] px-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex items-center gap-3" key={index}>
              <div className="  rounded-sm ">
                <svg
                  className="w-20 h-20 text-gray-300 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="flex-auto flex flex-col gap-2">
                <p className="bg-gray-300 h-3 w-[60%]"></p>
                <p className="bg-gray-300 h-3 w-[10%]"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartDetailSkeleton;
