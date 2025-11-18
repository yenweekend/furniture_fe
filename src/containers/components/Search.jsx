import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CircleAlert,
  History,
  Search as SearchIcon,
  TrendingUp,
  X,
} from "lucide-react";
import withShareInput from "@/hocs/withShareInput";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchInput,
  setResult,
  setHistorySearch,
} from "@/redux-toolkit/slice/search.slice";
let timeout;
import { useMutation } from "@tanstack/react-query";
import { getSearch } from "@/apis/home";
import formatPrice from "@/helpers/formatPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import useMessage from "@/hooks/useMessage";
import vnUnaccent from "@/helpers/vnUnaccent";
import {
  addToHistory,
  getHistory,
  removeFromHistory,
} from "@/helpers/localstorage";
const Search = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, onOpenChange] = useState(false);
  const messageApi = useMessage();
  const input = useSelector((state) => state.search.input);
  const historySearch = useSelector((state) => state.search.historySearch);
  const result = useSelector((state) => state.search.result);
  const dispatch = useDispatch();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: getSearch,
    onSuccess: (response) => {
      dispatch(setResult(response.data));
    },
  });
  useEffect(() => {
    if (input.trim().length === 0) {
      dispatch(setResult(null));
    }
  }, [input]);
  useEffect(() => {
    dispatch(setHistorySearch(getHistory()));
    onOpenChange(false);
    document.activeElement.blur();
  }, [location]);
  if (isError) {
    dispatch(setResult(null));
  }
  const handleChange = (e) => {
    dispatch(setSearchInput(e.target.value));
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value.trim().length > 0) {
        mutate(vnUnaccent(e.target.value));
      }
    }, 600);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn submit mặc định
    // Xử lý dữ liệu ở đây
    if (input.trim().length !== 0) {
      addToHistory(vnUnaccent(input));
      dispatch(setHistorySearch(getHistory()));

      navigate(`/search?q=${encodeURIComponent(input)}`);
    }
  };
  const handleSearch = useCallback(() => {
    if (input.trim().length !== 0) {
      addToHistory(vnUnaccent(input));
      dispatch(setHistorySearch(getHistory()));

      navigate(`/search?q=${encodeURIComponent(input)}`);
    }
  }, [input]);
  return (
    <form
      className={cn(
        "h-10 relative bg-[#fff] pr-[4px]  2md:min-w-[400px] flex-auto group",
        className
      )}
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        onChange={handleChange}
        placeholder="Tìm kiếm sản phẩm"
        className="pl-4 top-[50%] translate-y-[-50%] absolute w-full pr-[80px] leading-[1.5715] text-[14px] monserat_font peer"
        onFocus={() => {
          onOpenChange(true);
        }}
        onBlur={() => {
          onOpenChange(false);
        }}
      ></input>
      <div
        className="bg-redichi absolute right-[2px] top-[2px] bottom-[2px]  cursor-pointer px-3 flex items-center justify-center w-[70px] "
        onClick={handleSearch}
      >
        <SearchIcon className="text-[#fff]" width={20} height={20} />
      </div>
      {isError ? (
        <div
          className={`absolute  shadow-nd bg-[#fff] left-0 right-0 px-[20px] z-[99]   transition-all ease-linear duration-150 ${
            open
              ? " opacity-100  visible  top-[102%] "
              : "top-[120%] opacity-0 invisible"
          }`}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="border-b border-solid border-shop  py-[10px]">
            <div className="flex items-center">
              <SearchIcon className="text-blackshop" width={12} height={12} />
              <span className="text-[13px] pl-3">Từ khóa tìm kiếm:</span>
              <span className="text-[13px] pl-2 text-redichi font-bold">
                {input}
              </span>
            </div>
          </div>
          <div className="border-b border-solid border-shop  py-[10px] h-[100px] flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex gap-1 justify-center items-center   dark:invert">
                <CircleAlert />
              </div>
              <span className="text-[13px] pl-3 font-medium">
                Đã xảy ra lỗi vui lòng thử lại
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          // className="absolute  shadow-nd bg-[#fff] left-0 right-0 px-[20px] z-[99] top-[120%] opacity-0 invisible  peer-focus:opacity-100  peer-focus:visible  peer-focus:top-[102%] transition-all ease-linear duration-150"
          className={`absolute  shadow-nd bg-[#fff] left-0 right-0 px-[20px] z-[99]   transition-all ease-linear duration-150 ${
            open
              ? " opacity-100  visible  top-[102%] "
              : "top-[120%] opacity-0 invisible"
          }`}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="border-b border-solid border-shop  py-[10px]">
            <div className="flex items-center">
              <SearchIcon className="text-blackshop" width={12} height={12} />
              <span className="text-[13px] pl-3">Từ khóa tìm kiếm:</span>
              <span className="text-[13px] pl-2 text-redichi font-bold">
                {input}
              </span>
            </div>
          </div>

          {isPending && (
            // skeleton
            <div className="border-b border-solid border-shop  py-[10px] h-[100px] flex items-center justify-center">
              <div className="flex items-center">
                <div className="flex gap-1 justify-center items-center   dark:invert">
                  <div className="h-2 w-2 bg-[#d8d8d8] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-[#d8d8d8] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-[#d8d8d8] rounded-full animate-bounce"></div>
                </div>
                <span className="text-[13px] pl-3 font-medium">
                  Vui lòng đợi chút
                </span>
              </div>
            </div>
          )}
          {input.trim().length === 0 && (
            <>
              <div className="border-b border-solid border-shop">
                <h2 className="text-[14px]  font-bold text-redichi py-[10px]">
                  Xu hướng tìm kiếm
                </h2>
                <ul className="">
                  <li className="py-3">
                    <Link
                      to={`/search?q=${encodeURIComponent(vnUnaccent("bát"))}`}
                      className="flex items-center text-blackni hover:text-redichi "
                    >
                      <TrendingUp
                        className="text-inherit  transition-all ease-linear duration-300"
                        width={12}
                        height={12}
                      />
                      <span className="text-inherit text-[13px] font-nornal pl-[12px]">
                        Bát đũa cho gia đình
                      </span>
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link
                      to={`/search?q=${encodeURIComponent(vnUnaccent("tắm"))}`}
                      className="flex items-center text-blackni hover:text-redichi "
                    >
                      <TrendingUp
                        className="text-inherit  transition-all ease-linear duration-300"
                        width={12}
                        height={12}
                      />
                      <span className="text-inherit text-[13px] font-nornal pl-[12px]">
                        Dụng cụ phòng tắm
                      </span>
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link
                      to={`/search?q=${encodeURIComponent(
                        vnUnaccent("trang trí")
                      )}`}
                      className="flex items-center text-blackni hover:text-redichi "
                    >
                      <TrendingUp
                        className="text-inherit  transition-all ease-linear duration-300"
                        width={12}
                        height={12}
                      />
                      <span className="text-inherit text-[13px] font-nornal pl-[12px]">
                        Vật dụng trang trí cho không gian nhà đẹp
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              {historySearch.length > 0 && (
                <div className="border-b border-solid border-shop">
                  <h2 className="text-[14px]  font-bold text-redichi py-[10px]">
                    Tìm kiếm gần đây
                  </h2>
                  <ul className="">
                    {historySearch.length > 0 &&
                      historySearch.map((item) => (
                        <li
                          className="py-3 flex items-center justify-between"
                          key={item}
                        >
                          <Link
                            to={`/search?q=${encodeURIComponent(item)}`}
                            className=" text-blackni hover:text-redichi relative flex-auto items-center flex"
                          >
                            <History
                              className="text-inherit"
                              width={12}
                              height={12}
                            />
                            <span className="text-inherit text-[13px] font-nornal pl-[12px]">
                              {item}
                            </span>
                          </Link>
                          <div
                            className=" cursor-pointer text-blackni hover:text-redichi p-1 ml-4 "
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromHistory(item);
                              dispatch(setHistorySearch(getHistory()));
                            }}
                          >
                            <X
                              className="text-inherit"
                              size={16}
                              strokeWidth={1}
                            />
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </>
          )}
          {!result ? (
            ""
          ) : result?.rows?.length > 0 ? (
            <>
              <ul>
                {result.rows.slice(0, 4).map((rs) => (
                  <li
                    className="flex justify-between py-3 border-b border-solid border-shop"
                    key={rs.url}
                  >
                    <div className="">
                      <Link
                        to={rs.url}
                        className="text-[13px] hover:text-redichi transition-all ease-linear duration-300 font-normal mt-[10px] mb-[5px] block"
                      >
                        {rs.title}
                      </Link>
                      <span className="text-[13px] font-medium">
                        {formatPrice(rs.price)}
                      </span>
                    </div>
                    <div className="w-10 h-10 overflow-hidden flex-shrink-0">
                      <LazyLoadImage
                        src={rs.thumbnail}
                        effect="opacity"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              {result?.count > 4 && (
                <Link
                  to={`/search?q=${encodeURIComponent(input)}`}
                  className="block py-[10px] text-[13px] text-center hover:text-redichi"
                  onClick={() => {
                    addToHistory(vnUnaccent(input));
                    dispatch(setHistorySearch(getHistory()));
                  }}
                >
                  Xem thêm {result?.count - 4} sản phẩm
                </Link>
              )}
            </>
          ) : (
            <div className="text-center text-[14px] font-medium p-5">
              Không có sản phẩm nào
            </div>
          )}
        </div>
      )}
    </form>
  );
};
export default Search;
