import React, { useCallback, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { HoverEffectBox, NotFound } from "../../components";
import { useQuery } from "@tanstack/react-query";
import {
  getProductDetail,
  getViewdProduct,
  giveFeedBack,
} from "../../../apis/product.api";
import FancyBoxWrapper from "@/helpers/fancybox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import formatPrice from "@/helpers/formatPrice";
import CartItem from "@/containers/components/Items/CartItem";
import moment from "moment";
import {
  Minus,
  Plus,
  X,
  Facebook,
  Twitter,
  Link as LinkIcon,
  ShoppingCart,
  Loader2,
  UserRound,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Rate } from "antd";
import slugify from "@/helpers/slugify";
import _ from "lodash";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProductCard } from "../../components";
import { Card, CardContent } from "@/components/ui/card";
import ProductDetailSkeleton from "@/containers/components/Skeleton/ProductDetail";
import {
  saveViewedProduct,
  getViewedProductSlugs,
} from "@/helpers/localstorage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { add } from "@/apis/cart";
import { Button } from "@/components/ui/button";
import toast from "@/containers/components/Toaster";
import { updateCheckoutItems } from "@/helpers/localstorage";
import useMessage from "@/hooks/useMessage";
import { Controller, useForm } from "react-hook-form";
import ImageUploader from "@/containers/components/ImageUploader";
const ProductDetail = () => {
  const { account } = useSelector((state) => state.auth);

  const {
    setError,
    clearErrors,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      feedback: "",
      rate: "",
      imageData: [],
    },
  });
  const messageApi = useMessage();

  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.cart);
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 990px)");
  const [open, setOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const swipeRef = useRef(null);
  const thumbVerticalRef = useRef(null);
  const thumbHoriRef = useRef(null);
  const toSlide = (number) => {
    if (thumbVerticalRef.current && thumbHoriRef.current) {
      setCurrentIdx(number);
      const imageVerHeight =
        thumbVerticalRef.current.querySelector("img").clientHeight;
      const imageHorWidth =
        thumbHoriRef.current.querySelector("img").clientWidth;
      thumbVerticalRef.current.style.transform = `translateY(-${
        imageVerHeight * number
      }px)`;
      thumbHoriRef.current.style.transform = `translateX(-${
        imageHorWidth * number
      }px)`;
    }
    swipeRef.current?.swiper.slideTo(number, 400);
  };
  const { slug } = useParams();
  const contentRef = useRef();
  const [descriptionContentHeight, setDescriptionContentHeight] = useState(220);
  const [slugs, setSlugs] = React.useState(null);
  const [images, setImages] = useState(null);
  const [productVariant, setProductVariant] = useState(null);
  const [attribute, setAttribute] = React.useState({});
  const [readMore, setReadMore] = useState(false);

  const handleAttributeChange = useCallback((e, attributeName) => {
    setAttribute((prev) => {
      return { ...prev, [attributeName]: e.target.value };
    });
  }, []);
  const queryClient = useQueryClient();
  const { mutate, ...mutateAddToCart } = useMutation({
    mutationFn: add,
    onSuccess: (response) => {
      console.log(response);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Thêm vào giỏ hàng thành cônng",
        type: "success",
        data: {
          thumbnail: data.data.productDetail.thumbnail,
          price: data.data.productDetail.price,
          title: data.data.productDetail.title,
        },
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content:
          error.response.data.msg || "Thêm sản phẩm vào giỏ hàng thất bại!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const mutatePurchaseNowMethods = useMutation({
    mutationFn: add,
    onSuccess: (response) => {
      console.log(response);

      updateCheckoutItems([data.data.productDetail.id]);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content:
          error.response.data.msg ||
          "Không thể mua sản phẩm, vui lòng thử lại!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const mutateFeedBack = useMutation({
    mutationFn: giveFeedBack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-detail"] });
      setValue("imageData", []);
      reset();
      messageApi.open({
        type: "success",
        content: "Thêm đánh giá thành công",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
    onError: (error) => {
      console.log(error);

      messageApi.open({
        type: "error",
        content: error.response.data.msg || "Không thể gửi đánh giá",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      if (productVariant.stock - newQuantity < 0) {
        alert("Số lượng sản phẩm trong kho không đủ!");
        return prev;
      }
      // debouncedUpdateQuantity(newQuantity);
      return newQuantity;
    });
  };
  // Decrease quantity (prevent going below 1)
  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        alert("Số lượng phải lớn hơn 0");
        return prev;
      }
      const newQuantity = prev - 1;
      // debouncedUpdateQuantity(newQuantity);
      return newQuantity;
    });
  };

  const { isPending, isError, data } = useQuery({
    queryKey: ["product-detail", slug],
    queryFn: () => getProductDetail(slug),
    enabled: !!slug,
  });
  const {
    isPending: isViewedPending,
    isError: isViewedError,
    data: viewedData,
  } = useQuery({
    queryKey: ["product-viewd", slugs],
    queryFn: () => getViewdProduct(slugs),
    enabled: !!slugs,
  });
  useEffect(() => {
    setSlugs(getViewedProductSlugs());
  }, [location.pathname]);
  useEffect(() => {
    if (data) {
      if (!data.data.productDetail.single) {
        // if product has variant
        const outOfStock = data.data.variants.every(
          (product) => product.stock === 0
        );
        if (outOfStock) {
          setAttribute(data.data.variants[0].attributes);
        } else {
          setAttribute(
            data.data.variants.find((product) => product.stock > 0).attributes
          );
        }
        //   {
        //     "Kích thước": "D45xR45",
        //     "Màu sắc": "Họa tiết hoa lá Mint"
        // }
        const rs = data.data.variants.map((vr) => {
          const variantImages = vr.Images.map((item) => item.img_url);
          return [vr.thumbnail, ...variantImages];
        });
        setImages(rs.flat());
      } else {
        // product is single
        if (!data.data.productDetail.thumbnailM) {
          // if product do have thumbnailM
          setImages([
            data.data.productDetail.thumbnail, // other images of product in image tables
          ]);
        } else {
          setImages([
            data.data.productDetail.thumbnail,
            data.data.productDetail.thumbnailM,
          ]);
        }
      }
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      saveViewedProduct(data.data.productDetail.slug);
    }
  }, [location.pathname, data]);

  useEffect(() => {
    if (data && data.data.productDetail.single) {
      // if product do not have variant
      setProductVariant(data.data.productDetail);
    } else {
      if (data && attribute && images) {
        const variantMatches = data.data["variants"].find((variant) =>
          Object.entries(attribute).every(
            ([key, value]) => variant.attributes[key] === value
          )
        );
        const idx = images.findIndex((img) => img === variantMatches.thumbnail);
        setCurrentIdx(idx);

        swipeRef?.current?.swiper.slideTo(idx, 400);
        setProductVariant(variantMatches);
      }
    }
  }, [data, attribute, images]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (data && contentRef.current) {
      setDescriptionContentHeight(
        contentRef.current.getBoundingClientRect().height
      );
    }
  }, [data, contentRef]);

  if (isPending || isViewedPending) {
    return <ProductDetailSkeleton />;
  }
  if (isError || isViewedError) {
    return <NotFound />;
  }
  if (isViewedError) {
    messageApi.open({
      type: "error",
      content: "Đã xảy ra lỗi lấy dữ liệu sản phẩm đã xem",
      className: "custom-class",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    });
  }
  const handleAddToCart = (data) => {
    if (!account) {
      alert("Hãy đăng nhập để trải nghiệm tính năng này");
    } else {
      mutate(data);
    }
  };
  const onSubmit = (fData) => {
    const formData = new FormData();
    formData.append("rating", fData.rate);
    formData.append("feedback", fData.feedback);
    formData.append("productId", data.data.productDetail.id);
    fData.imageData.forEach((file) => {
      formData.append("images", file.originFileObj); // `originFileObj` contains the actual file
    });
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    mutateFeedBack.mutate(formData);
  };
  return (
    <div className="mt-[30px] mb-[55px] pb-[30px]">
      <FancyBoxWrapper
        options={{
          Carousel: {
            infinite: false,
          },
          Images: {
            zoom: true,
          },
          showClass: "f-fadeIn",
        }}
      ></FancyBoxWrapper>
      <div className="flex 2md:gap-[12px] 2md:items-stretch  2md:flex-row flex-col">
        <div className="2md:basis-45 flex-grow-0 w-full">
          <div className="flex flex-col bg-[#fff] ">
            <div className=" sticky top-0 flex items-stretch">
              {data.data.productDetail.thumbnailM && (
                <div className="flex-grow-0 2md:w-[80px] pt-3 w-[76px] flex-shrink-0 px-3 relative overflow-hidden 2md:block hidden">
                  <div className="absolute inset-0  px-3 overflow-y-auto no-scrollbar my-3">
                    <div
                      className=" flex flex-col transition-all ease-linear duration-300 "
                      ref={thumbVerticalRef}
                    >
                      {images?.map((img, idx) => (
                        <div
                          className={`${
                            currentIdx === idx
                              ? "border-redichi"
                              : "border-[#eee]"
                          } [&:not(last-child)]:mb-4 border border-solid  transition-all ease-linear duration-150 cursor-pointer`}
                          key={idx}
                          onClick={() => toSlide(idx)}
                        >
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full">
                <div className=" pb-[100%] w-full relative">
                  <div className="absolute w-full h-full ">
                    <div className=" w-full  flex  flex-row-reverse  ">
                      <div
                        className={
                          "overflow-hidden flex-auto pr-[6px] pl-[12px] py-[6px]"
                        }
                      >
                        <Swiper
                          ref={swipeRef}
                          style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                          }}
                          loop={false}
                          spaceBetween={10}
                          navigation={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper2"
                          onSlideChange={(swiper) => {
                            if (
                              thumbHoriRef.current &&
                              thumbVerticalRef.current
                            ) {
                              setCurrentIdx(swiper.activeIndex);

                              const imageHeight =
                                thumbVerticalRef.current.querySelector(
                                  "img"
                                ).clientHeight;
                              const imageHorWidth =
                                thumbHoriRef.current.querySelector(
                                  "img"
                                ).clientWidth;

                              thumbVerticalRef.current.style.transform = `translateY(-${
                                imageHeight * swiper.activeIndex
                              }px)`;
                              thumbHoriRef.current.style.transform = `translateX(-${
                                imageHorWidth * swiper.activeIndex
                              }px)`;
                            }
                          }}
                        >
                          {images?.map((img, index) => (
                            <SwiperSlide
                              key={`swipe-${index}`}
                              style={{
                                width: "100%",
                                paddingBottom: "100%",
                                position: "relative",
                              }}
                            >
                              <a
                                href={img}
                                className="h-full absolute inset-0 object-cover w-full"
                                data-fancybox="gallery"
                              >
                                <LazyLoadImage
                                  src={img}
                                  className={"h-full  object-cover "}
                                  effect="blur"
                                />
                              </a>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full relative  overflow-x-auto no-scrollbar block 2md:hidden">
                  <div
                    className=" flex transition-all ease-linear duration-300 "
                    ref={thumbHoriRef}
                  >
                    {images?.map((img, idx) => (
                      <div
                        className={`${
                          currentIdx === idx
                            ? "border-redichi"
                            : "border-[#eee]"
                        } basis-1/6 flex-shrink-0  [&:not(last-child)]:mr-4 border border-solid  transition-all ease-linear duration-150 cursor-pointer`}
                        key={idx}
                        onClick={() => toSlide(idx)}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-3">
              Chia sẻ:
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#25479b] flex items-center justify-center"
              >
                <Facebook size={16} fill="#fff" stroke="#fff" />
              </a>
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#0084ff] flex items-center justify-center"
              >
                <icons.messenger
                  fill="#fff"
                  stroke="#fff"
                  size={16}
                ></icons.messenger>
              </a>
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#55acee] flex items-center justify-center"
              >
                <Twitter size={16} fill="#fff" stroke="#fff" />
              </a>
              <a
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#cd242a] flex items-center justify-center"
              >
                <icons.pinterest
                  fill="#fff"
                  stroke="#fff"
                  size={16}
                ></icons.pinterest>
              </a>
              <button
                href="/"
                className="ml-[5px] w-[30px] h-[30px] rounded-full bg-[#929292] flex items-center justify-center"
              >
                <LinkIcon size={16} stroke="#fff" />
              </button>
            </div>
          </div>
          {data.data.feedback.length > 0 && (
            <div className="w-full bg-[#fff] py-5 px-3 mt-[15px]">
              <div className="flex flex-col">
                {data.data.feedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="border-b border-b-solid border-b-[rgba(0,0,0,0.09)] pb-[12px] pl-2 flex items-start gap-3"
                  >
                    <div className="thumb w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <UserRound stroke="#fff" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-normal">
                        nguyenvanyen
                      </span>
                      <Rate
                        disabled
                        defaultValue={2}
                        starColor="#fff"
                        className="ant-rate-custom-v1 ant-rate-custom "
                      />
                      <p className="text-[12px] text-[#0000008A] mb-3">
                        <span>
                          {moment(fb.createdAt)
                            .locale("vi")
                            .format("DD [tháng] MM, YYYY hh:mm A")}
                        </span>
                      </p>
                      <p className="text-[14px] text-[#333] font-medium pb-3">
                        {fb.comment}
                      </p>
                      <div className="flex items-center">
                        {fb.ReviewImages.map((img) => (
                          <div className="w-[60px] h-[60px]" key={img.id}>
                            <img
                              src={img.img_url}
                              className="w-full h-full object-cover"
                              alt="Ảnh feedback"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="2md:basis-55 w-full">
          <div className=" bg-[#fff]   p-[15px]">
            <div className=" leading-[130%] text-[20px] font-bold  text-redichi">
              {data.data.productDetail.title}
            </div>
            <div className="flex flex-wrap items-center product-origin mb-[15px] gap-2">
              <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                thương hiệu&nbsp;
                <b className="text-[--shop-color-main]">
                  {data.data.productDetail?.Vendor?.title}
                </b>
              </div>
              <div className="devide bg-[rgba(0,0,0,.06)] w-[0.8px] mx-[15px] h-[10px]"></div>
              <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                Mã sản phẩm:&nbsp;
                <b className="text-[--shop-color-main]">
                  {productVariant?.sku}
                </b>
              </div>
              <div className="devide bg-[rgba(0,0,0,.06)] w-[0.8px] mx-[15px] h-[10px]"></div>

              <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                Tình trạng:&nbsp;
                <b className="text-[--shop-color-main]">
                  {productVariant?.stock > 0 ? "Còn hàng" : "Hết hàng"}
                </b>
              </div>
            </div>
            <div className=" w-full bg-[#fafafa]  flex items-center p-[15px] mb-[15px]">
              <div className="flex items-center basis-2/3 ">
                <span className="text-[--shop-color-text]  text-[14px] font-bold w-[20%]">
                  Giá:
                </span>
                <strong className="text-[#ff0000] text-[26px] ml-[40px]">
                  {formatPrice(
                    productVariant?.price ?? data.data.productDetail.price
                  )}
                </strong>
                <span className="price-delete ml-[10px] text-[#878c8f] line-through font-light relative text-[13px]">
                  {formatPrice(
                    productVariant?.price_original ??
                      data.data.productDetail.price
                  )}
                </span>
              </div>
              <span className=" bsale-percent  w-10 rounded-sm px-[5px] bg-redni text-[#fff] block ml-auto">
                -5%
              </span>
            </div>
            {!data.data.productDetail.single &&
              Object.keys(data.data.attributes).map((attr) => (
                <div className=" my-[15px]" key={`attr-${slugify(attr)}`}>
                  <div className="flex items-center">
                    <div className="text-blackni font-bold text-[14px] flex-col flex pr-[20px]">
                      <span className="font-bold text-[13px]">{attr} :</span>
                      <span className="font-bold text-[13px] text-[#4ea8cd]">
                        {attribute && attribute[attr]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      {data.data.attributes[attr].map((value) => {
                        const obj1 = { ...attribute, [attr]: value };
                        const isExist = data.data.variants.some((product) => {
                          return _.isEqual(obj1, product.attributes);
                        });
                        return isExist ? (
                          <label
                            key={`label-${value}`}
                            className="radio-attr py-[7px] px-[10px] border border-solid  bg-[#fff] text-redichi cursor-pointer relative whitespace-nowrap overflow-hidden"
                          >
                            <input
                              type="radio"
                              name={`attr-value-${slugify(attr)}`}
                              value={value ?? ""}
                              className={"appearance-none"}
                              onChange={(event) =>
                                handleAttributeChange(event, attr)
                              }
                              checked={Boolean(
                                attribute &&
                                  Object.entries(attribute).some(
                                    ([, v]) => v === value
                                  )
                              )}
                            />
                            {value}
                          </label>
                        ) : (
                          <label
                            className="radio-attr py-[7px] px-[10px] border border-solid  bg-[#fff] text-redichi cursor-pointer relative sold-out whitespace-nowrap overflow-hidden opacity-50"
                            key={`label-${value}`}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              return 1;
                            }}
                          >
                            <input
                              type="radio"
                              className={"appearance-none"}
                              name={`attr-value-${slugify(attr)}`}
                              value={value ?? ""}
                              onChange={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                return 1;
                              }}
                            />
                            {value}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            <div className=" items-center mt-[15px] 2md:flex hidden">
              <span className="text-[--shop-color-text] font-bold text-[14px] mr-[100px]">
                Số lượng:
              </span>
              <div className="flex items-center  w-[120px]  ">
                <div
                  className=" flex items-center justify-center  border border-solid border-[#f3f4f4] w-8 h-8 bg-[#f3f4f4] cursor-pointer group"
                  onClick={handleDecrease}
                >
                  <Minus
                    size={16}
                    strokeWidth={3}
                    className="stroke-[#a4aaaf] group-hover:stroke-blacknitransition-all ease-linear duration-150"
                  />
                </div>
                <input
                  value={quantity}
                  readOnly
                  type="text"
                  className="border border-solid border-[#f3f4f4] w-8 h-8 text-center text-[14px] font-bold"
                />

                <div
                  className=" flex items-center justify-center border border-solid border-[#f3f4f4] w-8 h-8 bg-[#f3f4f4] cursor-pointer group"
                  onClick={handleIncrease}
                >
                  <Plus
                    size={16}
                    strokeWidth={3}
                    className="stroke-[#a4aaaf] group-hover:stroke-blacknitransition-all ease-linear duration-150"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-[15px] gap-[30px]">
              {mutateAddToCart.isPending ? (
                <div className="basis-1/2 2md:block hidden">
                  <Button disabled className={"rounded flex-auto w-full"}>
                    <Loader2 className="animate-spin" />
                    <span className="text-inheirt text-[14px] font-bold uppercase">
                      Thêm vào giỏ
                    </span>
                  </Button>
                </div>
              ) : (
                <div
                  className="basis-1/2 2md:block hidden"
                  onClick={() =>
                    handleAddToCart({
                      id: data.data.productDetail.id,
                      payload: quantity,
                    })
                  }
                >
                  <HoverEffectBox className={"w-full rounded"}>
                    <span className="text-inheirt text-[14px] font-bold uppercase">
                      Thêm vào giỏ
                    </span>
                  </HoverEffectBox>
                </div>
              )}

              <div className="basis-1/2 ">
                {mutatePurchaseNowMethods.isPending ? (
                  <Button disabled className={"rounded flex-auto w-full"}>
                    <Loader2 className="animate-spin" />
                    <span className="text-inheirt text-[14px] font-bold uppercase">
                      Mua ngay
                    </span>
                  </Button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[14px] text-[#fff] font-bold bg-redni w-full px-[25px] py-[10px] rounded uppercase"
                    onClick={() => {
                      mutatePurchaseNowMethods.mutate({
                        id: data.data.productDetail.id,
                        payload: quantity,
                      });
                    }}
                  >
                    Mua ngay
                  </motion.button>
                )}
              </div>
            </div>
            <div className="warranty flex md:items-center gap-3 mt-[15px] md:flex-row flex-col">
              <div className="basis-1/3 flex items-center gap-2">
                <div className="w-[30px] h-[30px]">
                  <img
                    src="https://theme.hstatic.net/200000796751/1001266995/14/product_deliverly_1_ico.png?v=82"
                    alt=""
                  />
                </div>
                <span className="text-vendor text-[14px]">1 năm bảo hành</span>
              </div>
              <div className="basis-1/3 flex items-center gap-2">
                <div className="w-[30px] h-[30px]">
                  <img
                    src="https://theme.hstatic.net/200000796751/1001266995/14/product_deliverly_2_ico.png?v=82"
                    alt=""
                  />
                </div>
                <span className="text-vendor text-[14px]">
                  Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá
                </span>
              </div>
              <div className="basis-1/3 flex items-center gap-2">
                <div className="w-[30px] h-[30px]">
                  <img
                    src="	https://theme.hstatic.net/200000796751/1001266995/14/product_deliverly_3_ico.png?v=82"
                    alt=""
                  />
                </div>
                <span className="text-vendor text-[14px]">
                  Hotline: <strong>1900 63 64 76 </strong>
                  (9-21h)
                </span>
              </div>
            </div>
          </div>
          {/* <div className="bg-[#fff] mt-[15px] p-[15px]">
            <div className="grid max-768:auto-cols-[85%]  md:auto-cols-[60%] max-1280:grid-flow-col max-1280:gap-4 max-1280:overflow-x-auto max-1280:no-scrollbar xl:grid-cols-2 xl:gap-[15px]">
              <CouponCard />
              <CouponCard />
              <CouponCard />
            </div>
          </div> */}
          <div className="bg-[#fff] mt-[15px] p-[15px]">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="bg-none w-full flex justify-start border-b-[2px] border-[#ededed]">
                <TabsTrigger
                  value="description"
                  className={
                    "text-[14px] font-bold text-black pb-[19px] uppercase border-b-[2px] border-transparent mr-[20px]"
                  }
                >
                  Mô tả sản phẩm
                </TabsTrigger>
                <TabsTrigger
                  value="judgement"
                  className={
                    "text-[14px] font-bold text-black pb-[19px] uppercase border-b-[2px] border-transparent"
                  }
                >
                  Đánh giá
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className={" pt-[20px]"}>
                {data.data.productDetail.description ? (
                  <motion.div
                    className={` overflow-hidden`}
                    initial={{ height: 220 }}
                    animate={{
                      height: readMore ? "auto" : 220,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="description-content"
                      ref={contentRef}
                      dangerouslySetInnerHTML={{
                        __html: data.data.productDetail.description,
                      }}
                    />
                  </motion.div>
                ) : (
                  <div className="text-[14px] text-center">
                    Chưa có mô tả cho sản phẩm này
                  </div>
                )}

                {descriptionContentHeight > 220 ? (
                  <div className={`desc-btn ${readMore ? "mt-[30px]" : ""}`}>
                    <button
                      className="border border-solid border-redichi rounded text-redichi text-[13px] capitalize flex items-center py-[6px] px-[15px] mx-auto gap-2"
                      onClick={() => setReadMore((state) => !state)}
                    >
                      {readMore ? (
                        <>
                          <Minus size={14} />
                          Rút gọn nội dung
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          Xem thêm nội dung
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </TabsContent>
              <TabsContent value="judgement">
                <div className="comments"></div>
                <p className="text-[14px] font-medium mb-[15px]">
                  Chưa có đánh giá cho sản phẩm này
                </p>
                <form className="judge-form p-5 border border-solid border-[#ededed] rounded-sm">
                  <h2 className="text-[20px] font-bold">Thêm đánh giá</h2>
                  <div className="flex items-start justify-between">
                    <div className="basis-1/3">
                      <p className="text-[14px] text-[#333]  mt-[15px] font-medium">
                        Đánh giá chung
                      </p>
                      <Controller
                        name="rate"
                        control={control}
                        rules={{
                          required: "Vui lòng đánh giá trước khi gửi feedback",
                        }}
                        render={({ field }) => (
                          <Rate {...field} className="ant-rate-custom " />
                        )}
                      />
                      {errors?.rate && (
                        <p className="text-redichi text-[13px] mt-[4px]">
                          {errors.rate.message}
                        </p>
                      )}
                    </div>
                    <div className="basis-2/3 flex justify-end flex-auto">
                      <Controller
                        name="imageData"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <ImageUploader
                              onChange={field.onChange}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                            {fieldState.error && (
                              <p style={{ color: "red" }}>
                                {fieldState.error.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                      {errors?.imageData && (
                        <p className="text-redichi text-[13px] mt-[4px]">
                          {errors.imageData.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-[15px]">
                    <label
                      htmlFor="judge"
                      className="text-blackni  text-[14px] font-bold"
                    >
                      Chi tiết đánh giá
                    </label>
                    <Controller
                      name="feedback"
                      control={control}
                      rules={{
                        required: "Vui lòng điền đánh giá chi tiết",
                      }}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Type your message here."
                          id="judge"
                          {...field}
                        />
                      )}
                    />
                    {errors?.feedback && (
                      <p className="text-redichi text-[13px] mt-[4px]">
                        {errors.feedback.message}
                      </p>
                    )}
                  </div>
                  {mutateFeedBack.isPending ? (
                    <Button disabled className={"rounded mt-[15px]"}>
                      <Loader2 className="animate-spin" />
                      <span className="text-inheirt text-[14px] font-bold uppercase">
                        Đang xử lí
                      </span>
                    </Button>
                  ) : (
                    <Button
                      className={"mt-[15px]"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!account) {
                          alert(
                            "Hãy đăng nhập để gửi feedback cho sản phẩm này"
                          );
                        } else {
                          handleSubmit(onSubmit)();
                        }
                      }}
                    >
                      Gửi ngay
                    </Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        ;
      </div>
      {data.data.productRelevant.length > 0 && (
        <div className=" home-collection md:p-[15px] relative md:px-0">
          <div className="pr-[100px] flex items-center gap-3">
            <h2 className="collection-title capitalize max-768:pl-[15px]">
              Xem thêm sản phẩm cùng loại
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
                {data.data.productRelevant.map((product) => (
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
        </div>
      )}
      {viewedData.data.viewedProducts.length > 0 && (
        <div className=" home-collection md:p-[15px] relative md:px-0">
          <div className="pr-[100px] flex items-center gap-3">
            <h2 className="collection-title capitalize max-768:pl-[15px]">
              Các sản phẩm đã xem
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
                {viewedData.data.viewedProducts.map((product) => (
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
        </div>
      )}

      <div className="fixed bottom-0 right-0 left-0  text-[#fff] bg-[#fff] flex items-center justify-between py-[12px] px-[20px] 2md:hidden pt-2  border-t z-[50]">
        <div className="flex items-center w-[720px] mx-auto gap-4">
          <div className="flex justify-center ">
            <div className="flex items-center mx-auto">
              <div
                className=" flex items-center justify-center  border border-solid border-[#f3f4f4] w-10 h-10 bg-[#f3f4f4] cursor-pointer group"
                onClick={handleDecrease}
              >
                <Minus
                  size={16}
                  strokeWidth={3}
                  className="stroke-[#a4aaaf] group-hover:stroke-blacknitransition-all ease-linear duration-150"
                />
              </div>
              <input
                readOnly
                type="text"
                value={quantity}
                className="border border-solid border-[#f3f4f4] w-10 h-10 text-center text-[14px] font-bold text-[#000]"
              />

              <div
                className=" flex items-center justify-center border border-solid border-[#f3f4f4] w-10 h-10 bg-[#f3f4f4] cursor-pointer group"
                onClick={handleIncrease}
              >
                <Plus
                  size={16}
                  strokeWidth={3}
                  className="stroke-[#a4aaaf] group-hover:stroke-blacknitransition-all ease-linear duration-150"
                />
              </div>
            </div>
          </div>
          {!isDesktop && cartData ? (
            <Drawer open={open} onOpenChange={setOpen} modal={true}>
              <DrawerTrigger className="cursor-pointer text-[#fff] py-2 pl-4 flex-auto w-full">
                <div
                  className="block p-[10px] flex-auto bg-redni text-[#fff] text-[13px] font-medium cursor-pointe text-center uppercase rounded cursor-pointer"
                  onClick={() =>
                    handleAddToCart({
                      id: data.data.productDetail.id,
                      payload: quantity,
                    })
                  }
                >
                  <span>Thêm vào giỏ </span>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left rounded-t-[10px] bg-redni ">
                  <DrawerTitle>
                    <div className="text-[15px]  font-medium text-[#fff] flex items-center justify-between">
                      <span className=" basis-1/3 text-[14px] font-normal">
                        {cartData?.length} sản phẩm
                      </span>
                      <span className=" basis-1/3  text-center font-bold ">
                        {formatPrice(
                          cartData?.reduce((initial, result) => {
                            return initial + parseInt(result.price);
                          }, 0)
                        )}
                      </span>
                      <div className="basis-1/3 flex justify-end">
                        <DrawerClose className="text-[#fff]">
                          <X stroke="#fff" size={20} />
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerTitle>
                  <DrawerDescription className={"hidden"}>
                    Thông tin giỏ hàng
                  </DrawerDescription>
                </DrawerHeader>
                <div className="py-[15px] ">
                  {cartData?.length > 0 ? (
                    <div className="max-h-[360px] overflow-y-scroll cart-view-scroll">
                      <ul className=" ">
                        {cartData?.map((product) => (
                          <CartItem product={product} key={product.id} />
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center flex-col gap-3 py-4  border-b border-solid border-shop">
                      <ShoppingCart
                        size={30}
                        strokeWidth={1.4}
                        className="text-redichi"
                      />
                      <span className="text-[13px] text-vendor">
                        Chưa có sản phẩm nào trong giỏ hàng{" "}
                      </span>
                    </div>
                  )}

                  <div className="  mb-[20px] flex justify-between items-center py-[10px] leading-6 px-[12px]">
                    <span className="text-blackni uppercase text-[14px]">
                      Tổng tiền :
                    </span>
                    <span className="text-redni font-bold text-[16px] ">
                      {formatPrice(
                        cartData?.reduce((initial, result) => {
                          return (
                            initial +
                            parseInt(result.price) * parseInt(result.quantity)
                          );
                        }, 0)
                      )}
                    </span>
                  </div>
                </div>
                <DrawerFooter className="pt-2">
                  <DrawerClose
                    asChild
                    className="block p-[10px] mt-[5px] w-full bg-redni text-[#fff] text-[13px] font-medium cursor-pointe text-center uppercase"
                  >
                    <Link to={"/cart"}>Xem giỏ hàng</Link>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <div className="cursor-pointer text-[#fff] py-2 pl-4 flex-auto w-full">
              <div
                className="block p-[10px] flex-auto bg-redni text-[#fff] text-[13px] font-medium cursor-pointe text-center uppercase rounded cursor-pointer"
                onClick={() =>
                  alert("Hãy đăng nhập để trải nghiệm tính năng này")
                }
              >
                <span>Thêm vào giỏ </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {mutateFeedBack.isPending && (
        <div className="fixed  inset-0 z-[999] bg-transparent"></div>
      )}
    </div>
  );
};

export default ProductDetail;
