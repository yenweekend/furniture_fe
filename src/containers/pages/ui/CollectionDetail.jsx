import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ProductCard } from "@/containers/components";
import {
  ArrowDownAZ,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/apis/category";
import { useParams } from "react-router-dom";
import { NotFound } from "@/containers/components";
import { Pagination } from "antd";
import CategorySkeleton from "@/containers/components/Skeleton/Category";
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
const CollectionDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectVendors, setSelectVendors] = useState([]);
  const [selectPrices, setSelectPrices] = useState([]);
  const [sort, setSort] = useState(null);
  const { slug } = useParams();
  const [open, onOpenChange] = useState(false);
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("locked-scroll");
    } else {
      document.body.classList.remove("locked-scroll");
    }
  }, [open]);
  const handleVendorChange = React.useCallback((event, vendor) => {
    setSelectVendors((state) => {
      if (event.target.checked) {
        return [...state, vendor];
      } else {
        return state.filter((item) => item.id !== vendor.id);
      }
    });
  }, []);
  const handlePriceChange = React.useCallback((event, price) => {
    setSelectPrices((state) => {
      if (event.target.checked) {
        return [...state, price];
      } else {
        return state.filter((item) => item.value !== price.value);
      }
    });
  }, []);
  const prices = useMemo(() => {
    return selectPrices.map((vendor) => vendor.value);
  }, [selectPrices]);
  const vendors = useMemo(() => {
    return selectVendors.map((vendor) => vendor.title);
  }, [selectVendors]);
  const isDesktop = useMediaQuery("(min-width: 990px)");
  const { isPending, isError, data } = useQuery({
    queryKey: ["collection", slug, currentPage, sort, vendors, prices],
    queryFn: () => getCollection(slug, currentPage, sort, vendors, prices),
    enabled: !!slug,
    refetchOnWindowFocus: false,
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
  if (isPending) {
    return <CategorySkeleton />;
  }

  if (isError) {
    return <NotFound />;
  }
  return (
    <div className="flex items-stretch">
      <div
        className={`filter-parent transition-all duration-300 ease-linear   ${
          open && !isDesktop ? "filter-show" : ""
        }`}
      >
        <div className="filter-header pl-[15px] pr-[50px] py-3 bg-redichi text-[#fff] flex items-center gap-2 text-[16px] uppercase font-bold relative 2md:hidden">
          <Filter size={20} className="stroke-[#fff]" strokeWidth={2} />
          Bộ lọc
          <button
            className="absolute right-3 center-y cursor-pointer"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            <X stroke="#fff" size={20} />
          </button>
        </div>
        <div className="  2md:sticky 2md:top-[30px]">
          <div className="flex flex-col  2md:px-0 px-[15px] ">
            <div className=" bg-[#fff] 2md:shadow-card">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="collection"
              >
                <AccordionItem value="collection">
                  <AccordionTrigger
                    className={
                      " text-[16px] font-bold  py-[10px] px-[15px] border-b border-b-[#e9e9e9] border-solid"
                    }
                  >
                    Danh mục sản phẩm
                  </AccordionTrigger>
                  <AccordionContent
                    className={" border-b border-b-shop 2md:border-none"}
                  >
                    <ul className="pl-4">
                      <li className="text-[15px]    hover:text-redichi   py-[5px]     transition-all ease-linear duration-150 ">
                        <a
                          href="/blogs/tin-tuc"
                          className="text-inherit  text-[14px]"
                        >
                          {" "}
                          Được mua nhiều gần đây
                        </a>
                      </li>
                      <li className="text-[15px]    hover:text-redichi   py-[5px]    transition-all ease-linear duration-150 ">
                        <a
                          href="/blogs/nguon-cam-hung"
                          className="text-inherit  text-[14px]"
                        >
                          {" "}
                          Sản phẩm mới
                        </a>
                      </li>
                      <li className="text-[15px]    hover:text-redichi   py-[5px]    transition-all ease-linear duration-150 ">
                        <a
                          href="/blogs/nguon-cam-hung"
                          className="text-inherit  text-[14px]"
                        >
                          {" "}
                          Tất cả sản phẩm
                        </a>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className=" bg-[#fff] 2md:hidden">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="collection"
              >
                <AccordionItem value="collection">
                  <AccordionTrigger
                    className={
                      " text-[16px] font-bold  py-[10px] px-[15px] border-b border-b-[#e9e9e9] border-solid"
                    }
                  >
                    Sắp xếp
                  </AccordionTrigger>
                  <AccordionContent
                    className={" border-b border-b-shop 2md:border-none"}
                  >
                    <ul className="pl-4 mt-[15px]">
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="price-asc"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="price-asc"
                            className="appearance-none outline-none p-2 relative"
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi ">
                            Giá: Tăng dần
                          </span>
                        </label>
                      </li>
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="price-desc"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="price-desc"
                            className="appearance-none outline-none p-2 relative"
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi ">
                            Giá: Giảm dần
                          </span>
                        </label>
                      </li>
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="title-asc"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="title-asc"
                            className="appearance-none outline-none p-2 relative"
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi ">
                            Tên: A-Z
                          </span>
                        </label>
                      </li>
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="title-desc"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="title-desc"
                            className="appearance-none outline-none p-2 relative"
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi ">
                            Tên: Z-A
                          </span>
                        </label>
                      </li>
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="out-of-fashion"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="out-of-fashion"
                            className="appearance-none outline-none p-2 relative"
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi ">
                            Cũ nhất
                          </span>
                        </label>
                      </li>
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="latest"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="latest"
                            className="appearance-none outline-none p-2 relative"
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi ">
                            Mới nhất
                          </span>
                        </label>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {data.data.vendors.length > 0 && (
              <div className="bg-[#fff] 2md:shadow-card mt-[15px] ">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="filter-1"
                >
                  <AccordionItem value="filter-1">
                    <AccordionTrigger
                      className={
                        " text-[16px] font-bold  py-[10px] px-[15px] border-b border-b-[#e9e9e9] border-solid"
                      }
                    >
                      Nhà cung cấp
                    </AccordionTrigger>
                    <AccordionContent
                      className={" border-b border-b-shop 2md:border-none"}
                    >
                      <ul className="pl-4 mt-[15px]">
                        {data.data.vendors.map((vendor) => (
                          <li
                            className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 "
                            key={vendor.id}
                          >
                            <label
                              htmlFor={vendor.slug}
                              className="checkbox flex items-center gap-3 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={selectVendors.some(
                                  (v) => v.id === vendor.id
                                )}
                                id={vendor.slug}
                                className="appearance-none outline-none p-2 relative"
                                onChange={(event) => {
                                  handleVendorChange(event, vendor);
                                }}
                              />
                              <span className="text-[14px] text-blackni font-normal group-hover:text-redichi uppercase">
                                {vendor.title}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
            <div className="bg-[#fff] 2md:shadow-card mt-[15px] ">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="filter-1"
              >
                <AccordionItem value="filter-1">
                  <AccordionTrigger
                    className={
                      " text-[16px] font-bold  py-[10px] px-[15px] border-b border-b-[#e9e9e9] border-solid"
                    }
                  >
                    Giá
                  </AccordionTrigger>
                  <AccordionContent
                    className={" border-b border-b-shop 2md:border-none"}
                  >
                    <ul className="pl-4 mt-[15px]">
                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="p1"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="p1"
                            className="appearance-none outline-none p-2 relative"
                            checked={selectPrices.some(
                              (price) => price.value === "lte_1000000"
                            )}
                            onChange={(event) => {
                              handlePriceChange(event, {
                                title: "Dưới 1.000.000₫",
                                value: "lte_1000000",
                              });
                            }}
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi uppercase">
                            Dưới 1.000.000₫
                          </span>
                        </label>
                      </li>

                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="p2"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="p2"
                            className="appearance-none outline-none p-2 relative"
                            checked={selectPrices.some(
                              (price) =>
                                price.value === "between_1000000_2000000"
                            )}
                            onChange={(event) => {
                              handlePriceChange(event, {
                                title: "1.000.000₫ - 2.000.000₫",
                                value: "between_1000000_2000000",
                              });
                            }}
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi uppercase">
                            1.000.000₫ - 2.000.000₫
                          </span>
                        </label>
                      </li>

                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="p3"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="p3"
                            className="appearance-none outline-none p-2 relative"
                            checked={selectPrices.some(
                              (price) =>
                                price.value === "between_2000000_3000000"
                            )}
                            onChange={(event) => {
                              handlePriceChange(event, {
                                title: "2.000.000₫ - 3.000.000₫",
                                value: "between_2000000_3000000",
                              });
                            }}
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi uppercase">
                            2.000.000₫ - 3.000.000₫
                          </span>
                        </label>
                      </li>

                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="p4"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="p4"
                            className="appearance-none outline-none p-2 relative"
                            checked={selectPrices.some(
                              (price) =>
                                price.value === "between_3000000_4000000"
                            )}
                            onChange={(event) => {
                              handlePriceChange(event, {
                                title: "3.000.000₫ - 4.000.000₫",
                                value: "between_3000000_4000000",
                              });
                            }}
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi uppercase">
                            3.000.000₫ - 4.000.000₫
                          </span>
                        </label>
                      </li>

                      <li className="text-[15px]    hover:text-redichi  mb-3     transition-all ease-linear duration-150 ">
                        <label
                          htmlFor="p5"
                          className="checkbox flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id="p5"
                            className="appearance-none outline-none p-2 relative"
                            checked={selectPrices.some(
                              (price) => price.value === "gte_4000000"
                            )}
                            onChange={(event) => {
                              handlePriceChange(event, {
                                title: "Trên 4.000.000₫",
                                value: "gte_4000000",
                              });
                            }}
                          />
                          <span className="text-[14px] text-blackni font-normal group-hover:text-redichi uppercase">
                            Trên 4.000.000₫
                          </span>
                        </label>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="filter-footer mx-[15px] h-[60px] border-t border-t-[#eee]">
          <button className="bg-[#f3f4f6] border border-solid border-[#e6e7eb] py-[10px] px-[15px] basis-1/2 cursor-pointer">
            Hủy
          </button>
          <button className="bg-redichi text-[#fff] py-[10px] px-[15px] basis-1/2 cursor-pointer">
            Áp dụng
          </button>
        </div>
      </div>
      <div className="2md:basis-3/4 md:px-[15px] w-full">
        <div className="">
          <LazyLoadImage
            src="https://theme.hstatic.net/200000796751/1001266995/14/collection_banner.jpg?v=82"
            effect="blur"
            className="w-full"
          />
        </div>
        <div className="mt-[15px]">
          <div className="flex md:items-center md:justify-between md:flex-row flex-col md:mx-0 mx-[15px]">
            <h2 className="text-[24px] font-bold text-redtitle">
              Tất cả sản phẩm
            </h2>
            <div className="flex items-center justify-between flex-auto md:mb-0 mb-[15px]">
              <span className="md:pl-[30px] text-[14px] font-normal">
                <strong className="text-[14px]">
                  {data.data.products.length}{" "}
                </strong>
                sản phẩm
              </span>
              <div className="2md:block hidden">
                <Select
                  onValueChange={(value) => {
                    setSort(value);
                  }}
                >
                  <SelectTrigger className="w-[200px] bg-[#fff] border border-solid border-shop font-bold relative pl-[40px] ">
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
              <div className="2md:hidden block">
                <div
                  className="max-w-[200px] bg-[#fff] border border-solid border-shop  relative  flex items-center gap-2 px-3 py-[3px] rounded-full cursor-pointer"
                  onClick={() => {
                    onOpenChange(true);
                  }}
                >
                  Bộ lọc
                  <Filter
                    size={20}
                    className="stroke-blackni"
                    strokeWidth={1.4}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-3 md:mx-0 mx-[15px]">
            {selectVendors.length > 0 && (
              <div className="flex items-center pl-[10px] pr-8 border-solid border border-shop rounded-full relative py-[2px] bg-[#fff]">
                <span className="text-blackni text-[13px] font-normal">
                  Nhà cung cấp:{" "}
                </span>
                <strong className="text-[#5d5d5d] text-[13px] pl-2">
                  {Array.isArray(selectVendors) &&
                    selectVendors.map((vendor) => vendor.title).join(", ")}
                </strong>
                <span
                  className="absolute right-2 cursor-pointer"
                  onClick={() => {
                    setSelectVendors([]);
                  }}
                >
                  <X size={20} className="stroke-blackni" strokeWidth={1.2} />
                </span>
              </div>
            )}
            {selectPrices.length > 0 && (
              <div className="flex items-center pl-[10px] pr-8 border-solid border border-shop rounded-full relative py-[2px] bg-[#fff]">
                <span className="text-blackni text-[13px] font-normal">
                  Giá
                </span>
                <strong className="text-[#5d5d5d] text-[13px] pl-2">
                  {selectPrices?.map((price) => price.title).join(", ")}
                </strong>
                <span
                  className="absolute right-2 cursor-pointer"
                  onClick={() => {
                    setSelectPrices([]);
                  }}
                >
                  <X size={20} className="stroke-blackni" strokeWidth={1.2} />
                </span>
              </div>
            )}

            {selectPrices.length > 0 || selectVendors.length > 0 ? (
              <button
                className="text-[13px] px-3 cursor-pointer text-center  border-solid border border-shop rounded-full relative py-[2px] bg-[#fff] text-redtitle underline"
                onClick={() => {
                  setSelectVendors([]);
                  setSelectPrices([]);
                }}
              >
                Xóa hết
              </button>
            ) : (
              ""
            )}
          </div>
          <div className=" xl:grid-cols-5 mt-[15px] grid items-stretch grid-rows-2 gap-y-[6px] 2xl:gap-y-[12px] md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 md:flex-auto  grid-cols-2 ">
            {data.data.products.map((product) => (
              <div
                className=" flex-shrink-0 flex-grow-0 px-[2px] xl:px-[6px] "
                key={product.slug}
              >
                <ProductCard productData={product} />
              </div>
            ))}
          </div>
          <div className="pagination flex items-center justify-center mt-[15px]">
            <Pagination
              showSizeChanger={false}
              total={data.data.count}
              defaultPageSize={30}
              current={currentPage}
              defaultCurrent={1}
              hideOnSinglePage
              itemRender={itemRender}
              onChange={(page, pageSize) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
