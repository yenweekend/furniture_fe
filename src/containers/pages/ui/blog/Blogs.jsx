import { CalendarDays, ChevronsRight } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import moment from "moment";
import { getBlog } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";
import extractFirstPTag from "@/helpers/extractEntryContent";
import BlogSkeleton from "@/containers/components/Skeleton/Blog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Blogs = () => {
  const { slug } = useParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => getBlog(slug),
    enabled: !!slug,
  });
  useEffect(() => {
    if (data) {
      document.title = `${data.data.data.title}-Baya`;
    }
  }, [data]);
  if (isPending) {
    return <BlogSkeleton />;
  }
  if (isError) {
    return error;
  }
  return (
    <>
      <div className="py-[9px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs/nguon-cam-hung">
                Nguồn cảm hứng
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pb-[15px] ">
        <h1 className="text-redichi text-[28px] font-bold mb-5">
          {data.data.data.title}
        </h1>
        <div className="grid grid-cols-2 gap-y-[15px] -mx-[6px] xl:mx-[-15px]">
          {data.data.data.BlogDetails.map((blog) => (
            <div className="xl:px-[15px] px-[6px]" key={blog.slug}>
              <div className="shadow-card h-full">
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="overflow-hidden">
                    <a
                      className="post-image w-full relative pb-[100%] block banner-hover-effect hover:rotate-[-3deg] hover:scale-110 transition-all ease-linear duration-300"
                      href={`/blogs/${data.data.data.slug}/${blog.slug}`}
                    >
                      <div
                        className="absolute inset-0
            "
                      >
                        <LazyLoadImage
                          src={blog.thumbnail}
                          effect="blur"
                          className="w-full h-full absolute inset-0"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="py-[10px] px-[17px] bg-[#fff] flex flex-col flex-auto">
                    <h3 className="text-[16px] mb-[5px] font-bold leading-[1.2] flex items-center">
                      <Link
                        to={`/blogs/${data.data.data.slug}/${blog.slug}`}
                        className="block w-0 flex-auto line-clamp-2 text-redichi font-bold text-[14px] 2md:text-[20px] "
                      >
                        {blog.title}
                      </Link>
                    </h3>
                    <div
                      className="mt-auto
                      "
                    >
                      <div className="flex items-center mb-[15px] ">
                        <p className="text-blackni font-normal w-0 flex-auto line-clamp-2 text-[12px]  2md:text-[16px] ">
                          {extractFirstPTag(blog.content)}
                        </p>
                      </div>
                      <div className="flex  items-center text-[#a8aeba] flex-wrap border-t border-solid border-[#eee] pt-[15px]   ">
                        <div className="flex  items-center gap-1 text-inherit text-[10px] 2md:text-[13px] font-normal relative">
                          bởi:
                          <span className="text-inherit text-[10px] 2md:text-[13px] xl:whitespace-nowrap whitespace-normal font-normal">
                            Văn Yên
                          </span>
                        </div>
                        <div className=" w-[5px] h-[5px] xl:block  rounded-full bg-[#a8aeba] mx-[8px]"></div>
                        <span className="text-inherit text-[10px] 2md:text-[13px] xl:whitespace-nowrap whitespace-normal font-normal xl:px-4">
                          {moment(blog.createdAt)
                            .locale("vi")
                            .format("DD [tháng] MM, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
