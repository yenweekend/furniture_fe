import React, { useMemo, useState } from "react";

import {
  HoverEffectButton,
  CouponCard,
  ProductCardNi,
  ProductCard,
  BlogCard,
  CollectionCard,
  NotFound,
  CartFloating,
} from "@/containers/components/index";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CircleChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel as CarouselAntd } from "antd";
import HomeSkeleton from "@/containers/components/Skeleton/Home";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/apis/home";

const Home = () => {
  const [sofaNewArrival, setSofaNewArrival] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  React.useEffect(() => {
    document.title = "Siêu thị nội thất & trang trí Baya";
    window.scrollTo(0, 0);
  }, []);
  const { isPending, isError, data } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
    retry: false,
  });
  const newArrivalProducts = useMemo(() => {
    if (data) {
      if (!sofaNewArrival) {
        return data?.data?.data?.latestCollection?.products || [];
      } else {
        return data?.data?.data?.sofaProducts;
      }
    } else {
      return [];
    }
  }, [sofaNewArrival, data]);
  if (isPending) {
    return <HomeSkeleton />;
  }
  if (isError) {
    return <NotFound />;
  }

  console.log(data);

  return (
    <>
      <div>
        <div>
          <section className="banner ">
            <div className=" 2md:px-2 shrink-0 w-full overflow-hidden">
              <CarouselAntd
                arrows
                infinite={false}
                effect={isDesktop ? "fade" : ""}
              >
                <div>
                  <Link
                    to="/categories/phong-tam"
                    className="rounded overflow-hidden block"
                  >
                    <picture>
                      <source
                        media="(min-width:768px"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_3_img.jpg?v=82"
                      />
                      <source
                        media="(max-width:768px)"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_3_mb.jpg?v=83"
                      />
                      <LazyLoadImage
                        effect="opacity"
                        src="https://theme.hstatic.net/200000796751/1001266995/14/slide_3_img.jpg?v=82"
                        className="w-full h-full "
                      />
                    </picture>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/categories/yep-bep"
                    className="rounded overflow-hidden block"
                  >
                    <picture>
                      <source
                        media="(min-width:768px"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_1_img.jpg?v=82"
                      />
                      <source
                        media="(max-width:768px)"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_1_mb.jpg?v=83"
                      />
                      <LazyLoadImage
                        effect="opacity"
                        src="https://theme.hstatic.net/200000796751/1001266995/14/slide_1_img.jpg?v=82"
                        className="w-full h-full "
                      />
                    </picture>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/categories/nha-dep"
                    className="rounded overflow-hidden block"
                  >
                    <picture>
                      <source
                        media="(min-width:768px"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_2_img.jpg?v=82"
                      />
                      <source
                        media="(max-width:768px)"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_2_mb.jpg?v=83"
                      />
                      <LazyLoadImage
                        effect="opacity"
                        src="https://theme.hstatic.net/200000796751/1001266995/14/slide_2_img.jpg?v=82"
                        className="w-full h-full "
                      />
                    </picture>
                  </Link>
                </div>
                <div>
                  <Link to="" className="rounded overflow-hidden block">
                    <picture>
                      <source
                        media="(min-width:768px"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_4_img.jpg?v=82"
                      />
                      <source
                        media="(max-width:768px)"
                        srcSet="https://theme.hstatic.net/200000796751/1001266995/14/slide_4_mb.jpg?v=83"
                      />
                      <LazyLoadImage
                        effect="opacity"
                        src="https://theme.hstatic.net/200000796751/1001266995/14/slide_4_img.jpg?v=82"
                        className="w-full h-full "
                      />
                    </picture>
                  </Link>
                </div>
              </CarouselAntd>
            </div>
          </section>
          <div className="flex  items-stretch overflow-y-auto no-scrollbar  mt-[15px] max-768:pl-[15px] ">
            <div className=" 2md:basis-1/4 w-[60%] shrink-0 2md:px-[15px] pr-[15px]  md:w-[40%]">
              <CollectionCard
                collectionData={{
                  thumbnail:
                    "https://theme.hstatic.net/200000796751/1001266995/14/categorybanner_1_img.jpg?v=82",
                  title: "Phòng khách",
                  url: "/collections/noi-that-phong-khach",
                }}
              />
            </div>
            <div className=" 2md:basis-1/4 w-[60%] shrink-0 2md:px-[15px] pr-[15px]  md:w-[40%]">
              {" "}
              <CollectionCard
                collectionData={{
                  thumbnail:
                    "https://theme.hstatic.net/200000796751/1001266995/14/categorybanner_2_img.jpg?v=82",
                  title: "Phòng ngủ",
                  url: "/collections/noi-that-phong-ngu",
                }}
              />
            </div>
            <div className=" 2md:basis-1/4 w-[60%] shrink-0 2md:px-[15px] pr-[15px]  md:w-[40%]">
              {" "}
              <CollectionCard
                collectionData={{
                  thumbnail:
                    "https://theme.hstatic.net/200000796751/1001266995/14/categorybanner_3_img.jpg?v=82",
                  title: "Phòng ăn và bếp",
                  url: "/categories/nha-bep",
                }}
              />
            </div>
            <div className=" 2md:basis-1/4 w-[60%] shrink-0 2md:px-[15px] pr-[15px]  md:w-[40%]">
              {" "}
              <CollectionCard
                collectionData={{
                  thumbnail:
                    "https://theme.hstatic.net/200000796751/1001266995/14/categorybanner_4_img.jpg?v=82",
                  title: "Phòng làm việc",
                  url: "/categories/noi-that-van-phong",
                }}
              />
            </div>
          </div>
        </div>
        <section className="bg-collectionichi home-collection md:p-[15px] relative">
          <div className="pr-[100px] flex items-center gap-3 md:pt-0 pt-3 pl-2 md:pl-0">
            <div className="fade-loading relative w-2 h-2 rounded-full bg-init"></div>
            <h2 className="collection-title">
              <Link to={data.data.data?.kitchenCollection?.url}>
                Đồ bếp nhập khẩu cao cấp
              </Link>
            </h2>
          </div>
          <div className="mt-[15px] ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full group "
            >
              <CarouselContent>
                {data.data.data?.kitchenCollection?.products.map((product) => (
                  <CarouselItem key={product.slug} className="card-item">
                    <div className="md:px-[6px] px-[2px]">
                      <Card className={"rounded-none"}>
                        <CardContent className="flex items-center justify-center p-0">
                          <ProductCard productData={product} />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute top-2 md:top-[12px] right-[20px] flex items-center gap-4">
                <CarouselPrevious
                  className={"bg-[#fff] shadow-carousel text-blackni"}
                />
                <CarouselNext
                  className={"bg-[#fff] shadow-carousel text-blackni"}
                />
              </div>
            </Carousel>
          </div>
          <div className="flex items-center justify-center mt-[15px]">
            <HoverEffectButton className={"w-[320px] "}>
              <CircleChevronRight
                size={20}
                className="text-inherit inline"
                strokeWidth={1}
              />
            </HoverEffectButton>
          </div>
        </section>
        <div className=" home-collection flex items-stretch overflow-x-auto no-scrollbar md:ml-[-12px] ">
          {data.data.data?.coupons.map((item) => (
            <div
              className="shrink-0 md:px-[6px] px-3 md:basis-1/2  lg:basis-1/3 xl:basis-1/4 basis-[86%] "
              key={item.id}
            >
              <CouponCard data={item} />
            </div>
          ))}
        </div>
        <div className=" home-collection md:p-[15px] relative md:px-0">
          <div className="pr-[100px] flex items-center gap-3">
            <h2 className="collection-title capitalize max-768:pl-[15px]">
              Back to school - up to 60%
            </h2>
          </div>
          <div className="mt-[15px] ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full group "
            >
              <CarouselContent className={""}>
                {data.data.data?.schoolCollection?.products.map((product) => (
                  <CarouselItem key={product.slug} className="card-item">
                    <div className="md:px-[6px] px-[2px] h-full">
                      <Card className={"rounded-none"}>
                        <CardContent className="flex h-full items-center justify-center p-0">
                          <ProductCard productData={product} />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute top-[12px] max-768:top-[-6px] right-[20px] flex items-center gap-4">
                <CarouselPrevious
                  className={"bg-[#fff] shadow-carousel text-blackni"}
                />
                <CarouselNext
                  className={"bg-[#fff] shadow-carousel text-blackni"}
                />
              </div>
            </Carousel>
          </div>
          <div className="flex items-center justify-center mt-[15px]">
            <HoverEffectButton className={"w-[320px] "}>
              <CircleChevronRight
                size={20}
                className="text-inherit inline"
                strokeWidth={1}
              />
            </HoverEffectButton>
          </div>
        </div>
        <div className="max-w-[1400px] 2md:px-[15px] home-collection">
          <div className="py-[15px] 2md:px-5  bg-[url('https://theme.hstatic.net/200000796751/1001266995/14/categorize_img.jpg?v=82')] bg-no-repeat bg-cover relative flex items-stretch">
            <div className="absolute   bg-[#000] opacity-35 inset-0"></div>
            <div className="2md:basis-2/12 basis-1/2 md:basis-1/3 md:px-[15px] flex flex-col relative justify-center px-[6px]">
              <h3 className="text-[18px] font-semibold mb-[8px] text-catecolor text-left   md:text-[20px]">
                Xu hướng tìm kiếm
              </h3>
              <Link
                to="/categories/all"
                className="px-[15px] py-[5px] uppercase text-[13px] text-catecolor bg-ichi font-medium block mr-auto rounded-full max-768:rounded-none "
              >
                Xem ngay
              </Link>
            </div>
            <div className="2md:basis-10/12 md:basis-2/3 basis-1/2 px-[6px]">
              <div className=" flex flex-row  md:px-[15px]  flex-nowrap overflow-x-auto shrink-0 no-scrollbar">
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/sofa"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_1_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Sofa
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/ban"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_2_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Bàn
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/ghe"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_3_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Ghế
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/nem"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_4_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Nệm
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/giuong"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_5_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Giường
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/den"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_6_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Đèn
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/lo-hoa-binh-hoa"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_7_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Lọ Hoa
                    </span>
                  </div>
                </div>
                <div className="2md:basis-1/8 md:basis-1/3 basis-1/2 px-1 shrink-0">
                  <div className="relative h-full text-center py-[15px] flex flex-col items-center shrink-0 ">
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <Link
                          to="/categories/khung-anh"
                          className=" block w-full bg-[#fff] hover:shadow-scale transition-all ease-linear duration-150 rounded-full "
                        >
                          <LazyLoadImage
                            effect="opacity"
                            src="https://theme.hstatic.net/200000796751/1001266995/14/categorize_8_img.jpg?v=82"
                            className="w-full h-full "
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#fff] text-center mt-[15px] max-990:hidden">
                      Khung ảnh
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="home-collection ">
          <div className=" flex items-center gap-3 mb-5 justify-between max-990:flex-col max-990:justify-start max-990:items-start max-990:px-[15px]">
            <h2 className="collection-title capitalize">
              <Link to={"/collections/san-pham-moi"}>sản phẩm nổi bật</Link>
            </h2>
            <div className="text-[14px]">
              <button
                className={`px-4 py-2 cursor-pointer rounded-full font-bold border border-solid ${
                  sofaNewArrival
                    ? "border-[#eae4e8] text-[#787878]"
                    : "border-redichi bg-redichi text-[#fff] "
                } ml-[20px] capitalize  max-990:ml-0 max-990:text-[12px] max-990:px-4 `}
                onClick={() => setSofaNewArrival(false)}
              >
                sản phẩm mới
              </button>
              <button
                className={`px-4 py-2 cursor-pointer rounded-full  font-bold border border-solid   ml-[20px] capitalize max-990:text-[12px] max-990:px-4 ${
                  !sofaNewArrival
                    ? "border-[#eae4e8] text-[#787878]"
                    : "border-redichi bg-redichi text-[#fff] "
                }`}
                onClick={() => setSofaNewArrival(true)}
              >
                sofa new arrival
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="2md:basis-1/5 bg-collectionni max-990:hidden">
              <LazyLoadImage
                effect="opacity"
                src="https://theme.hstatic.net/200000796751/1001266995/14/home_coll_1_banner.jpg?v=82"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="2md:basis-4/5 xl:grid-cols-5 2md:pl-[14px] grid  grid-rows-2 gap-y-[12px] md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 md:flex-auto w-full grid-cols-2">
              {newArrivalProducts.map((product) => (
                <div
                  className=" shrink-0 flex-grow-0 md:px-[6px] px-[2px]"
                  key={product.slug}
                >
                  <ProductCard productData={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center mt-[15px]">
            <HoverEffectButton url={"/collections/san-pham-moi"}>
              <strong className="text-inherit">Sản phẩm mới</strong>
            </HoverEffectButton>
          </div>
        </section>
        <section className="banner flex 2md:-mx-[15px] max-990:gap-y-3 max-990:flex-col home-collection">
          <div className="  2md:basis-1/2 relative px-[15px] ">
            <Link
              to="/categories/chan-ga-goi"
              className="w-full block banner-hover-effect overflow-hidden rounded"
            >
              <LazyLoadImage
                effect="opacity"
                src="https://theme.hstatic.net/200000796751/1001266995/14/homebanner_1_img.jpg?v=82"
                className="w-full h-full "
              />
            </Link>
          </div>
          <div className="  2md:basis-1/2 relative px-[15px] ">
            <Link
              to="/categories/nen-thom"
              className="w-full block banner-hover-effect overflow-hidden rounded"
            >
              <LazyLoadImage
                effect="opacity"
                src="https://theme.hstatic.net/200000796751/1001266995/14/homebanner_2_img.jpg?v=82"
                className="w-full h-full "
              />
            </Link>
          </div>
        </section>
        <section className="home-collection ">
          <div className="flex 2md:items-stretch w-full max-990:flex-col">
            <div className=" 2md:basis-7/10 bg-[#fff] 2md:pt-[20px] 2md:pr-[20px] flex flex-col justify-end  2md:max-w-[70%] flex-grow-0 relative">
              <div className="">
                <h2 className="collection-title capitalize pl-[20px] max-990:pl-[15px] mb-[15px] max-990:pt-3">
                  <Link to={"/categories/phong-tam"}>
                    Chút xinh xắn cho nhà tắm
                  </Link>
                </h2>
                <div className="">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full group "
                  >
                    <CarouselContent>
                      {data.data.data?.showerProducts
                        .reduce((acc, _, i) => {
                          if (i % 3 === 0) {
                            acc.push(
                              data.data.data?.showerProducts.slice(i, i + 3)
                            );
                          }
                          return acc;
                        }, [])
                        .map((productGroup, index) => (
                          <CarouselItem
                            className="2lg:basis-1/3 2md:basis-1/2 basis-[80%] md:basis-1/2"
                            key={index}
                          >
                            <div className="md:px-[6px] px-[2px]">
                              <Card className={"rounded-none"}>
                                <CardContent className="flex p-0 flex-col">
                                  {productGroup.map((product) => (
                                    <ProductCardNi
                                      key={product.slug}
                                      productData={product}
                                    />
                                  ))}
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute top-[12px] right-[20px] flex items-center gap-4 2lg:hidden max-990:top-[6px] max-990:right-[10px]">
                      <CarouselPrevious
                        className={"bg-[#fff] shadow-carousel text-blackni"}
                      />
                      <CarouselNext
                        className={"bg-[#fff] shadow-carousel text-blackni"}
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
            <div className=" 2md:basis-3/10 shrink-0 bg-categoryni flex-col flex items-center justify-center max-990:px-[15px]">
              <Link
                to="/categories/nen-thom"
                className="w-full block banner-hover-effect overflow-hidden "
              >
                <LazyLoadImage
                  effect="opacity"
                  src="https://theme.hstatic.net/200000796751/1001266995/14/home_collection_3_banner.jpg?v=82"
                  className="w-full h-full "
                />
              </Link>
            </div>
          </div>
        </section>
        <section className="home-collection posts relative">
          <h2 className="collection-title capitalize  mb-[20px] max-990:pl-[15px]">
            Bài viết mới nhất
          </h2>
          <div className="">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full group max-990:px-[15px]"
            >
              <CarouselContent className={""}>
                {data.data.data?.blogs?.map((blog) => (
                  <CarouselItem
                    key={blog.slug}
                    className="lg:basis-1/5  2md:basis-1/4 basis-[80%] md:basis-1/3"
                  >
                    <div className="md:px-[6px] px-[2px]">
                      <Card className={"rounded-none"}>
                        <CardContent className="flex  items-center justify-center p-0">
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
        {/* <CartFloating /> */}
        //TODO
      </div>
    </>
  );
};

export default Home;
