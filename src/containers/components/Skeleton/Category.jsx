import React from "react";

const Category = () => {
  return (
    <div className=" flex">
      <div className="filter-parent transition-all duration-300 ease-linear ">
        <div className="xl:basis-1/4 xl:mx-[15px]  animate-pulse">
          <div className="xl:sticky xl:top-[144px] flex flex-col gap-8">
            <div className="">
              <div className="bg-gray-200 rounded-none h-[30px] mb-1"></div>
              <div className="flex flex-col gap-3 ">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <p className="w-5 h-4 bg-gray-200"></p>
                    <p className=" h-4 bg-gray-200 w-[50%] "></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div className="bg-gray-200 rounded-none h-[30px] mb-1"></div>
              <div className="flex flex-col gap-3 ">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <p className="w-5 h-4 bg-gray-200"></p>
                    <p className=" h-4 bg-gray-200 w-[50%] "></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div className="bg-gray-200 rounded-none h-[30px] mb-1"></div>
              <div className="flex flex-col gap-3 ">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <p className="w-5 h-4 bg-gray-200"></p>
                    <p className=" h-4 bg-gray-200 w-[50%] "></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="2md:basis-3/4 md:px-[15px] w-full">
        <div className="w-full relative pb-[30%] ">
          <div className="absolute inset-0">
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-sm ">
              <svg
                className="size-[100px] text-gray-300 "
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

        <div className="mt-[15px]">
          <p className="bg-gray-200 h-5  mb-[20px] w-[30%] ml-[6px]"></p>
          <div className="flex items-center flex-wrap ">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                className="card-item flex flex-col gap-1 px-[6px]"
                key={index}
              >
                <div className="w-full pb-[100%] relative mb-2">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded">
                    <svg
                      className="size-[40px] text-gray-300 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
                <p className="skeleton h-3 w-[100%]"></p>
                <p className="skeleton h-3 w-[30%]"></p>
                <p className="skeleton h-3 w-[100%]"></p>
                <p className="skeleton h-3 mb-2 w-[100%]"></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
