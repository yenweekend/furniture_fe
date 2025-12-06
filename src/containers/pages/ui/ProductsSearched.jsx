import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { ArrowDownAZ, ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "@/apis/home";
import vnUnaccent from "@/helpers/vnUnaccent";
import { NotFound, ProductCard } from "@/containers/components";
import SearchSkeleton from "@/containers/components/Skeleton/Search";
import { useQuery } from "@tanstack/react-query";
const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return (
      <a className=" w-full h-full flex items-center justify-center">
        <ChevronLeft size={20} stroke="#333" />
      </a>
    );
  }
  if (type === "next") {
    return (
      <a className=" w-full h-full flex items-center justify-center">
        <ChevronRight size={20} stroke="#333" />
      </a>
    );
  }
  return originalElement;
};
const ProductsSearched = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get the 'q' parameter value
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["search-result", query, currentPage, sort],
    queryFn: () => getSearch(vnUnaccent(query), currentPage, sort),
    enabled: !!query,
    keepPreviousData: true,
    placeholderData: (prevData) => prevData, // Giữ dữ liệu cũ khi fetch

    retry: false,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [data]);
  if (isError) {
    return <NotFound />;
  }
  return (
    <>
      <div>
        <h2 className="text-[30px] text-redichi text-center font-bold mt-[25px] mb-[5px]">
          Tìm kiếm
        </h2>
        <p className="flex items-center justify-center text-[14px]">
          <span>Có&nbsp;</span>
          <strong>{data?.data?.count} sản phẩm&nbsp;</strong>
          <span>cho tìm kiếm&nbsp;</span>
        </p>
        <div className="w-[60px] h-[4px] bg-[#252a2b] mt-[25px] mb-[30px] mx-auto"></div>
      </div>
      <div className="md:px-0 px-[15px]">
        <div className="flex items-center justify-between">
          <div className="text-[14px]">
            Kết quả tìm kiếm cho:{" "}
            <strong className="text-redni">&nbsp;"{query}"</strong>
          </div>
          <div className="w-[280px]">
            <Select
              onValueChange={(value) => {
                setSort(value);
              }}
            >
              <SelectTrigger className="w-full bg-[#fff] border border-solid border-shop font-bold relative pl-[40px] ">
                <div className="absolute left-3">
                  <ArrowDownAZ
                    size={20}
                    className="stroke-blackni"
                    strokeWidth={1.4}
                  />
                </div>
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent className={"bg-[#fff] shadow-card"}>
                <SelectGroup>
                  <SelectItem value="price_asc"> Giá: Tăng dần</SelectItem>
                  <SelectItem value="price_desc"> Giá: Giảm dần</SelectItem>
                  <SelectItem value="title_asc"> Tên: A-Z</SelectItem>
                  <SelectItem value="title_desc"> Tên : Z-A</SelectItem>
                  <SelectItem value="createdAt_asc"> Cũ nhất</SelectItem>
                  <SelectItem value="createdAt_desc"> Mới nhất</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="rows mt-[15px] md:px-0 px-[15px]">
        {isPending ? (
          <SearchSkeleton />
        ) : (
          <>
            <div className="grid lg:grid-cols-5 grid-cols-2 gap-3 ">
              {data.data.rows.map((product) => (
                <div className="" key={product.slug}>
                  <ProductCard productData={product} />
                </div>
              ))}
            </div>
            <div className="pagination flex items-center justify-center mt-[15px]">
              <Pagination
                showSizeChanger={false}
                total={data.data.count}
                defaultPageSize={15}
                current={currentPage}
                defaultCurrent={1}
                hideOnSinglePage
                itemRender={itemRender}
                onChange={(page, pageSize) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductsSearched;
