import { CalendarDays, ChevronsRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import moment from "moment";
import extractFirstPTag from "@/helpers/extractEntryContent";

const BlogCard = ({ postData = null }) => {
  return postData ? (
    <div className="w-full h-full flex flex-col ">
      <div className="overflow-hidden">
        <Link
          className="post-image w-full relative pb-[100%] block banner-hover-effect hover:rotate-[-3deg] hover:scale-110 transition-all ease-linear duration-300"
          to={`${postData.Blog.url}/${postData.slug}`}
        >
          <div
            className="absolute inset-0
      "
          >
            <LazyLoadImage
              src={postData.thumbnail}
              effect="blur"
              className="w-full h-full absolute inset-0"
            />
          </div>
        </Link>
      </div>
      <div className="py-[10px] px-[17px] bg-[#fff] flex flex-col flex-auto">
        <h3 className="text-[16px] mb-[5px] font-bold leading-[1.2] flex items-center">
          <Link
            to={`${postData.Blog.url}/${postData.slug}`}
            className="block   text-redichi font-bold"
          >
            <p className="line-clamp-2">{postData.title}</p>
          </Link>
        </h3>
        <div className="flex items-center mb-[15px] ">
          <p className="text-[#a8aeba] w-0 flex-auto line-clamp-2 text-[13px]">
            {extractFirstPTag(postData.content)}
          </p>
        </div>
        <div className="flex justify-between items-center text-[#a8aeba] border-t border-solid border-[#eee] pt-[15px] mt-auto ">
          <div className="flex items-center gap-1">
            <CalendarDays stroke="#a8aeba" size={14} strokeWidth={1.4} />
            <span className="text-inherit text-[11px]">
              {" "}
              {moment(postData.createdAt)
                .locale("vi")
                .format("DD [tháng] MM, YYYY")}
            </span>
          </div>
          <Link
            to={`${postData.Blog.url}/${postData.slug}`}
            className=" items-center text-inherit text-[11px] hover:text-redichi cursor-pointer group transition-all ease-linear duration-150 md:flex hidden"
          >
            Xem thêm
            <ChevronsRight
              className="stroke-[#a8aeba] group-hover:stroke-redichi transition-all ease-linear duration-150"
              size={14}
              strokeWidth={1.4}
            />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    "onggoing"
  );
};

export default BlogCard;
