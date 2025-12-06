import { CalendarDays, ChevronsRight, ListOrdered, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import moment from "moment";
import { getBlogDetail } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/containers/components";
import BlogDetailSkeleton from "@/containers/components/Skeleton/BlogDetail";
const BlogDetail = () => {
  const contentRef = useRef(null);
  const [open, onOpenChange] = useState(true);
  const [openDropdown, onOpenChangeDropdown] = useState(false);
  const [content, setContent] = useState([]);
  const { slug } = useParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blog-detail", slug],
    queryFn: () => getBlogDetail(slug),
    enabled: !!slug,
  });
  const createNestedHeadings = (headings) => {
    const nested = [];
    const stack = [];

    headings.forEach((heading) => {
      while (
        stack.length > 0 &&
        stack[stack.length - 1].level >= heading.level
      ) {
        stack.pop();
      }
      const newItem = { ...heading, children: [] };

      if (stack.length === 0) {
        nested.push(newItem);
      } else {
        stack[stack.length - 1].children.push(newItem);
      }

      stack.push(newItem);
    });

    return nested;
  };

  useEffect(() => {
    if (!data) return;
    contentRef.current.innerHTML = data.data.data.content;
    document.title = data.data.data.title;

    // Create a new div element to hold the content
    const newDiv = document.createElement("div");
    newDiv.innerHTML = data.data.data.content;

    // Query all headings inside the new div
    const elements = newDiv.querySelectorAll("h1, h2, h3, h4");
    if (!elements.length) return; // Check if any headings exist

    // Map through the headings and extract the necessary data
    const extractedHeadings = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.innerText,
      level: ["H1", "H2"].includes(el.tagName)
        ? 2
        : el.tagName === "H3"
        ? 3
        : 4,
    }));
    setContent(createNestedHeadings(extractedHeadings)); // Or do something with the extracted headings
  }, [data]);
  const handleScroll = useCallback((event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const href = event.target.getAttribute("href"); // Get the href value (e.g., "#title")
    const id = href.replace("#", ""); // Remove the '#' to get the ID

    const element = document.getElementById(id); // Find the target element by ID
    if (element) {
      const headerHeight = document.getElementById("header")?.offsetHeight || 0; // Get the header height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY; // Get the position of the element
      const offsetPosition = elementPosition - headerHeight - 10; // Adjust for header height with some padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  if (isError) {
    return error;
  }
  return (
    <>
      {isPending ? (
        <BlogDetailSkeleton />
      ) : (
        <>
          <div className="py-[9px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={data.data.data.Blog.url}>
                    {data.data.data.Blog.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.data.data.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="py-[15px] px-5 bg-[#fff] shadow-card">
            <div className="fixed left-[20px] top-[50%] z-50">
              <DropdownMenu
                modal={false}
                onOpenChange={onOpenChangeDropdown}
                open={openDropdown}
              >
                <DropdownMenuTrigger asChild>
                  <div className="w-[35px] h-[35px] bg-[#fff] border border-solid border-[#eee] rounded flex items-center justify-center cursor-pointer  ">
                    <ListOrdered />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className={"max-w-[280px]"}>
                  <DropdownMenuLabel>
                    <div className="flex items-center justify-between">
                      <span>Các nội dung chính</span>
                      <span
                        className="cursor-pointer"
                        onClick={() => onOpenChangeDropdown(false)}
                      >
                        <X strokeWidth={1.2} />
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-3 py-[5px]">
                    <ul className=" list-outside ml-4 ">
                      {content?.map((item) => (
                        <li
                          key={item.id}
                          className="text-[14px] list-disc marker:text-redichi text-coupontext font-normal  relative mb-2"
                        >
                          <a
                            href={`#${item.id}`}
                            onClick={handleScroll}
                            className="hover:text-redichi transition-all ease-linear duration-150 text-[13px] font-normal"
                          >
                            {item.text}
                          </a>
                          {item.children && item.children.length > 0 && (
                            <ul className=" list-outside ml-4 ">
                              {item.children.map((child) => (
                                <li
                                  key={child.id}
                                  className="text-[14px] list-disc marker:text-redichi text-coupontext font-normal  relative"
                                >
                                  <a
                                    href={`#${child.id}`}
                                    onClick={handleScroll}
                                    className="hover:text-redichi transition-all ease-linear duration-150 text-[13px] font-normal"
                                  >
                                    {child.text}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h1
              className="text-redichi text-[28px] font-bold mb-[10px]"
              id="title"
            >
              {data.data.data.title}
            </h1>
            <div className="flex  items-center text-[#74839f] mb-[15px]">
              <div className="flex pr-4 items-center gap-1 text-inherit text-[14px] font-normal relative">
                bởi:
                <span className="text-inherit text-[14px]  font-normal">
                  Văn Yên
                </span>
                <div className="absolute w-[5px] h-[5px] rounded-full bg-[#74839f] center-y right-[-2px]"></div>
              </div>
              <span className="text-inherit text-[14px]  font-normal px-4">
                {moment(data.data.data.createdAt)
                  .locale("vi")
                  .format("DD [tháng] MM, YYYY")}
              </span>
            </div>
            <div className="">
              <LazyLoadImage src={data.data.data.thumbnail} className="" />
            </div>
            <div className="py-[8px] px-[15px] border border-solid border-[#e0f1e9] shadow-card-1 rounded my-[15px] ">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-2"
                open={open}
                onOpenChange={onOpenChange}
              >
                <AccordionItem value="item-2">
                  <AccordionTrigger
                    iconClassName={"hidden"}
                    className={"pl-[150px] relative"}
                  >
                    <span
                      className="text-[#bcbdc1] text-[13px]   font-bold"
                      onClick={() => onOpenChange((state) => !state)}
                    >
                      [
                      <span className="text-redichi text-[13px] cursor-pointer font-bold">
                        {open ? "Ẩn" : "Hiện"}
                      </span>
                      ]
                    </span>
                    <span
                      className="absolute text-[16px] font-bold top-[50%] translate-y-[-50%] left-0 "
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Các nội dung chính
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={" border-none"}>
                    <ul className=" list-outside ml-4 ">
                      {content?.map((item) => (
                        <li
                          key={item.id}
                          className="text-[14px] list-disc marker:text-redichi text-coupontext font-normal  relative mb-2"
                        >
                          <a
                            href={`#${item.id}`}
                            onClick={handleScroll}
                            className="hover:text-redichi transition-all ease-linear duration-150 text-[14px] font-normal"
                          >
                            {item.text}
                          </a>
                          {item.children && item.children.length > 0 && (
                            <ul className=" list-outside ml-4 ">
                              {item.children.map((child) => (
                                <li
                                  key={child.id}
                                  className="text-[14px] list-disc marker:text-redichi text-coupontext font-normal  relative"
                                >
                                  <a
                                    href={`#${child.id}`}
                                    onClick={handleScroll}
                                    className="hover:text-redichi transition-all ease-linear duration-150 text-[14px] font-normal"
                                  >
                                    {child.text}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="content" ref={contentRef}></div>
            <div className="tags mb-[30px] flex items-center">
              <span className="font-bold text-[#333] text-[16px]">Tags: </span>
              <p className="flex items-center flex-wrap">
                <a href="/" className="text-redni text-[14px] cursor-pointer">
                  {" "}
                  #nội thất baya,
                </a>
                <a href="/" className="text-redni text-[14px] cursor-pointer">
                  #đồ trang trí,
                </a>
                <a href="/" className="text-redni text-[14px] cursor-pointer">
                  #nội thất
                </a>
              </p>
            </div>
            <div className="mb-[30px] border-t border-solid border-t-shop text-[16px] pt-[25px] flex items-center">
              <div className="px-[15px] text-blackni font-normal text-[13px]">
                Đang xem:{" "}
                <span className="font-bold text-[14px] text-redichi ">
                  {data.data.data.title}
                </span>
              </div>
            </div>
          </div>
          <section className="home-collection posts relative">
            <h2 className="collection-title capitalize  mb-[20px] max-990:pl-[15px]">
              Bài viết liên quan
            </h2>
            <div className="">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full group max-990:px-[15px]"
              >
                <CarouselContent className={""}>
                  {data.data.relateBlogs.map((blog) => (
                    <CarouselItem
                      key={blog.slug}
                      className="md:basis-1/3 basis-[48%]"
                    >
                      <div className="md:px-[6px] px-[2px] h-full">
                        <Card className={"rounded-none h-full "}>
                          <CardContent className="flex h-full items-center justify-center p-0 ">
                            <BlogCard postData={blog} />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute top-[3px] right-[20px] flex items-center gap-4 max-990:top-0">
                  <CarouselPrevious
                    className={"bg-[#fff] shadow-carousel text-blackni"}
                  />
                  <CarouselNext
                    className={"bg-[#fff] shadow-carousel text-blackni"}
                  />
                </div>
              </Carousel>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default BlogDetail;
