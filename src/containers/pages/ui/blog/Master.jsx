import { CalendarDays, ChevronsRight } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import moment from "moment";
import { getLatestBLogs } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import LastesBlogSkeleton from "./LastesBlog";
const Master = () => {
  const location = useLocation();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: getLatestBLogs,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  if (isError) {
    return error;
  }
  return (
    <div className="max-w-[1400px] mx-auto ">
      <div className="flex xl:items-stretch xl:flex-row flex-col">
        <div className="xl:basis-3/4 xl:pr-[15px] max-990:px-3  ">
          <Outlet />
        </div>
        {isPending ? (
          <LastesBlogSkeleton />
        ) : (
          <div className="xl:basis-1/4 xl:mx-[15px] mt-[30px] xl:mt-[38.3px]">
            <div className="xl:sticky xl:top-0 ">
              <div className=" bg-[#fff] shadow-card">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-2"
                >
                  <AccordionItem value="item-2">
                    <AccordionTrigger
                      className={
                        " text-[16px] font-bold text-redichi py-[15px] px-5 border-b-[1.6px] border-b-[#e9e9e9] border-solid"
                      }
                    >
                      Bài viết mới nhất
                    </AccordionTrigger>
                    <AccordionContent className={" border-none"}>
                      <ul className=" ">
                        {data.data.data.map((blog, index) => (
                          <li
                            className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px]   [&:last-child]:border-b-transparent px-5 flex"
                            key={blog.slug}
                          >
                            <div className="relative w-[90px] h-[90px] mr-[10px]">
                              <Link
                                to={`/blogs/${blog.Blog.slug}/${blog.slug}`}
                                className="overflow-hidden"
                              >
                                <LazyLoadImage
                                  src={blog.thumbnail}
                                  effect="opacity"
                                  className="h-full w-full object-cover"
                                />
                              </Link>
                              <span
                                className="h-7 w-7 rounded-full bg-ichi flex items-center justify-center text-[#fff] text-[12px] absolute  border-[2px] solid border-[#fff]"
                                style={{
                                  left: 0,
                                  transform: "translate(-50%,-50%)",
                                  top: "50%",
                                }}
                              >
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex flex-col flex-auto">
                              <div className="flex items-center">
                                <Link
                                  to={`/blogs/${blog.Blog.slug}/${blog.slug}`}
                                  className="cursor-pointer flex-auto w-0 line-clamp-2 text-redtitle text-[13px] mb-[5px] "
                                >
                                  {blog.title}
                                </Link>
                              </div>
                              <span className="text-[12px] text-blackni font-normal">
                                {blog.Blog.title}
                                <span className="text-[#a8aeba] text-[12px] block">
                                  {moment(blog.createdAt)
                                    .locale("vi")
                                    .format("DD [tháng] MM, YYYY")}
                                </span>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className=" bg-[#fff] shadow-card mt-[30px]">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={
                        " text-[16px] font-bold text-redichi py-[15px] px-5 border-b-[1.6px] border-b-[#e9e9e9] border-solid"
                      }
                    >
                      Danh mục bài viết
                    </AccordionTrigger>
                    <AccordionContent className={" border-none"}>
                      <ul className=" ">
                        <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                          <Link
                            to="/blogs/tin-tuc"
                            className="text-inherit  text-[14px]"
                          >
                            {" "}
                            Bài viết
                          </Link>
                        </li>
                        <li className="text-[15px] border-b-[#eee] border-b border-b-solid  py-[15px] hover:text-redichi  [&:last-child]:border-b-transparent px-5    hover:marker:text-redni transition-all ease-linear duration-150 ">
                          <Link
                            to="/blogs/nguon-cam-hung"
                            className="text-inherit  text-[14px]"
                          >
                            {" "}
                            Nguồn cảm hứng
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Master;
