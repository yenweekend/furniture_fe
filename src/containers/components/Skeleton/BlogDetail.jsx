import React from "react";

const BlogDetail = () => {
  return (
    <div className="animate-pulse ">
      <div className="py-[9px] w-[40%] h-3 bg-gray-200 mx-5"></div>
      <div className="py-[15px] px-5 ">
        <h1 className="h-[20px] font-bold mb-5 w-[30%] bg-gray-200"></h1>
        <div className="overflow-hidden relative w-full pb-[125%] bg-gray-200 ">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-[250px] h-[250px] text-gray-300 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
        <div className="mt-[15px]"></div>
        <div className="flex flex-col gap-2">
          <p className="skeleton h-3 "></p>
          <p className="skeleton h-3 "></p>
          <p className="skeleton h-3 "></p>
          <p className="skeleton h-3 "></p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
