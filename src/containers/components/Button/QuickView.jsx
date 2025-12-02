import React, {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useRef,
} from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
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
import { X, Minus, Plus, ChevronsRight, ShoppingCart, Eye } from "lucide-react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CloseButton } from "..";
import formatPrice from "@/helpers/formatPrice";
import _ from "lodash";
import slugify from "@/helpers/slugify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
const Slider = forwardRef(
  ({ className, images, setCurrentIdx, currentIdx }, ref) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    return (
      <>
        <div className="mb-[30px]">
          <div className={cn("py-3 ", className)}>
            <Swiper
              ref={ref}
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                position: "relative",
                paddingBottom: "100%",
              }}
              loop={false}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiperBig"
              onSlideChange={(swiper) => {
                setCurrentIdx(swiper.activeIndex);
              }}
            >
              {images?.map((img, idx) => (
                <SwiperSlide key={`abc-${idx}`}>
                  <LazyLoadImage
                    effect="opacity"
                    src={img}
                    className={"h-full w-full object-cover absolute inset-0"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-6 px-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {images?.map((img, idx) => (
                <SwiperSlide key={`sff-${idx}`}>
                  <LazyLoadImage src={img} effect="opacity" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </>
    );
  }
);
export { Slider };
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { add } from "@/apis/cart";
import toast from "@/containers/components/Toaster";
import useMessage from "@/hooks/useMessage";
import { useSelector } from "react-redux";
const QuickView = ({ className, children, data }) => {
  const { account, loading } = useSelector((state) => state.auth);
  const messageApi = useMessage();
  const swiperRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  const { mutate, isSuccess, ...mutateAddToCart } = useMutation({
    mutationFn: add,
    onSuccess: (response) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Thêm vào giỏ hàng thành cônng",
        type: "success",
        data: {
          thumbnail: data.thumbnail,
          price: data.price,
          title: data.title,
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
  const [open, setOpen] = React.useState(false);
  // const [selectedGift, setSelectedGift] = React.useState(null);
  // const handleGiftChange = (e) => {
  //   setSelectedGift(e.target.value);
  // };
  const [images, setImages] = useState(null);
  const [productVariant, setProductVariant] = useState(null);
  const [attribute, setAttribute] = React.useState({});
  const handleAttributeChange = useCallback((e, attributeName) => {
    setAttribute((prev) => {
      return { ...prev, [attributeName]: e.target.value };
    });
  }, []);
  useEffect(() => {
    if (data) {
      if (!data.single) {
        setAttribute(
          data.variants.find((product) => product.stock > 0).attributes
        );
        const rs = data.variants.map((vr) => {
          const variantImages = vr.Images.map((item) => item.img_url);
          return [vr.thumbnail, ...variantImages];
        });
        setImages(rs.flat());
      } else {
        if (!data.thumbnailM) {
          // if product do have thumbnailM
          setImages([
            data.thumbnail, // other images of product in image tables
          ]);
        } else {
          setImages([data.thumbnail, data.thumbnailM]);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.single) {
        setProductVariant(data);
      } else {
        if (attribute && images) {
          const variantMatches = data.variants.find((variant) =>
            Object.entries(attribute).every(
              ([key, value]) => variant.attributes[key] === value
            )
          );
          const idx = images.findIndex(
            (img) => img === variantMatches.thumbnail
          );
          setCurrentIdx(idx);
          swiperRef?.current?.swiper.slideTo(idx, 400);
          setProductVariant(variantMatches);
        }
      }
    }
  }, [data, attribute, images]);
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
  const handleAddToCart = (data) => {
    if (!account) {
      alert("Hãy đăng nhập để trải nghiệm tính năng này");
    } else {
      mutate(data);
    }
  };
  const isDesktop = useMediaQuery("(min-width: 990px)");
  if (isDesktop) {
    return (
      <>
        <div onClick={() => setOpen(true)} className={cn("", className)}>
          {children}
        </div>
        <Modal
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className="quick_view"
        >
          <div className="p-3 flex  ">
            <div className="basis-1/2 pr-[12px] flex-grow-0 overflow-hidden px-3 pt-3 flex flex-col ">
              <Slider
                className={"border border-solid border-[#f4f4f4]"}
                images={images}
                ref={swiperRef}
                setCurrentIdx={setCurrentIdx}
                currentIdx={currentIdx}
              />
            </div>
            <div className="basis-1/2 bg-[#fff] px-3">
              <div className="flex justify-end " onClick={() => setOpen(false)}>
                <CloseButton />
              </div>
              <div className="">
                <div className=" leading-[130%] text-[20px] font-bold my-[5px] text-redichi">
                  {productVariant?.title}
                </div>
                <div className="flex flex-wrap items-center product-origin mb-[15px] gap-y-1">
                  {productVariant?.Vendor?.title && (
                    <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                      thương hiệu
                      <b className="text-[--shop-color-main]">
                        {productVariant?.Vendor?.title}
                      </b>
                    </div>
                  )}
                  <div className="devide bg-[rgba(0,0,0,.06)] w-[0.8px] mx-[15px] h-[10px]"></div>
                  <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                    Mã sản phẩm:
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
                <div className="h-[60px] w-full bg-[#fafafa]  flex items-center p-8">
                  <span className="text-[--shop-color-text]   font-bold">
                    Giá:
                    <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                      {formatPrice(productVariant?.price)}
                    </strong>
                  </span>
                  <span className="price-delete ml-[10px] text-[#878c8f] line-through font-light relative text-[13px]">
                    {formatPrice(productVariant?.price_original)}
                  </span>
                  <span className="sale-percent  w-10 rounded-sm px-[5px] bg-redni text-[#fff] block ml-auto">
                    -5%
                  </span>
                </div>
                <div className=" my-[15px]">
                  {!data?.single &&
                    data?.attributes &&
                    Object.keys(data?.attributes).map((attr) => (
                      <div className=" my-[15px]" key={`attr-${slugify(attr)}`}>
                        <div className="flex items-center">
                          <div className="text-blackni font-bold text-[14px] flex-col flex pr-[20px] basis-[30%]">
                            <span className="font-bold text-[13px]">
                              {attr} :
                            </span>
                            <span className="font-bold text-[13px] text-[#4ea8cd]">
                              {attribute && attribute[attr]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] basis-[70%] flex-wrap">
                            {data?.attributes[attr].map((value) => {
                              const obj1 = { ...attribute, [attr]: value };
                              const isExist = data?.variants.some((product) => {
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
                                          ([k, v]) => v === value
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
                </div>

                <div className="flex items-center mt-[15px]">
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
                    <div className="border border-solid border-[#f3f4f4] w-8 h-8 flex items-center justify-center text-[14px] font-bold">
                      1
                    </div>
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
                {mutateAddToCart.isPending ? (
                  <div className="flex items-center    gap-3 cursor-pointer flex-auto justify-center  text-[#fff] mt-[15px]">
                    <Button disabled className={"rounded flex-auto w-full"}>
                      <Loader2 className="animate-spin" />
                      <span className="text-inheirt text-[14px] font-bold uppercase">
                        Thêm vào giỏ hàng
                      </span>
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex items-center  py-[10px] px-[25px]  gap-3 cursor-pointer flex-auto justify-center bg-redichi text-[#fff] mt-[15px] h-10"
                    onClick={() =>
                      handleAddToCart({
                        id: data.id,
                        payload: quantity,
                      })
                    }
                  >
                    <span className="w-6 h-6 ">
                      <ShoppingCart size={24} stroke="#fff" />
                    </span>
                    <span className="text-[14px] font-bold uppercase">
                      Thêm vào giỏ hàng
                    </span>
                  </div>
                )}

                <Link
                  to={data?.url}
                  className="text-blacknitext-[14px]  flex items-center cursor-pointer mt-[15px] hover:text-redni group underline"
                >
                  Xem chi tiết sản phẩm
                  <ChevronsRight
                    size={16}
                    className="stroke-blacknigroup-hover:stroke-redni pt-[2px]"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className={cn("", className)}>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left rounded-t-[10px]  border-b border-solid border-[#eee] relative">
          <DrawerTitle>
            <div className=" max-768:w-[90%] flex text-center">
              <p className="line-clamp-2 text-[16px]  font-bold text-redichi text-center  w-full">
                {productVariant?.title}
              </p>
            </div>
          </DrawerTitle>
          <DrawerClose asChild>
            <div className="absolute w-8 h-8 center-y right-[6px] flex items-center justify-center cursor-pointer">
              <CloseButton />
            </div>
          </DrawerClose>
          <DrawerDescription className={"hidden"}>
            Thông tin sản phẩm
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-[60vh] overflow-y-auto pb-[12px]">
          <div className=" flex flex-col ">
            <div className="  flex-grow-0 overflow-hidden  pt-3 flex-col ">
              <Slider
                className={"border-none"}
                images={images}
                ref={swiperRef}
                setCurrentIdx={setCurrentIdx}
                currentIdx={currentIdx}
              />
            </div>
            <div className=" bg-[#fff] px-3">
              <div className="pt-[15px] border-t border-solid border-t-shop">
                <div className=" leading-[130%] text-[20px] font-bold my-[5px] text-redichi">
                  {productVariant?.title}
                </div>
                <div className="flex flex-wrap items-center product-origin mb-[15px]">
                  {productVariant?.Vendor?.title && (
                    <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                      thương hiệu
                      <b className="text-[--shop-color-main]">
                        {productVariant?.Vendor?.title}
                      </b>
                    </div>
                  )}
                  <div className="devide bg-[rgba(0,0,0,.06)] w-[0.8px] mx-[15px] h-[10px]"></div>
                  <div className="text-[--shop-color-text] text-[13px] font-normal capitalize">
                    Mã sản phẩm:
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
                <div className="h-[60px] w-full bg-[#fafafa]  flex items-center p-8">
                  <span className="text-[--shop-color-text]  font-bold">
                    Giá:
                    <strong className="text-[#ff0000] text-[18px] ml-[40px]">
                      {formatPrice(productVariant?.price)}
                    </strong>
                  </span>
                  <span className="price-delete ml-[10px] text-[#878c8f] line-through font-light relative text-[13px]">
                    {formatPrice(productVariant?.price_original)}
                  </span>
                  <span className="sale-percent  w-10 rounded-sm px-[5px] bg-redni text-[#fff] block ml-auto">
                    -5%
                  </span>
                </div>
                <div className="variants mt-3">
                  {!data?.single &&
                    data?.attributes &&
                    Object.keys(data?.attributes).map((attr) => (
                      <div className=" my-[15px]" key={`attr-${slugify(attr)}`}>
                        <div className="flex items-center">
                          <div className="text-blackni font-bold text-[14px] flex-col flex pr-[20px] basis-[30%]">
                            <span className="font-bold text-[13px]">
                              {attr} :
                            </span>
                            <span className="font-bold text-[13px] text-[#4ea8cd]">
                              {attribute && attribute[attr]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] basis-[70%] flex-wrap">
                            {data?.attributes[attr].map((value) => {
                              const obj1 = { ...attribute, [attr]: value };
                              const isExist = data?.variants.some((product) => {
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
                                          ([k, v]) => v === value
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
                </div>

                <Link
                  to={data?.url}
                  className="text-blacknitext-[14px]  flex items-center cursor-pointer mt-[15px] hover:text-redni group underline"
                >
                  Xem chi tiết sản phẩm
                  <ChevronsRight
                    size={16}
                    className="stroke-blacknigroup-hover:stroke-redni pt-[2px]"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="pt-2 flex items-center flex-row border-t z-[9999]">
          <div className="flex justify-center">
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
              <div className="border border-solid border-[#f3f4f4] w-10 h-10 flex items-center justify-center text-[14px] font-bold">
                1
              </div>
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
          <DrawerClose
            className="block p-[10px]  w-full bg-redni text-[#fff] text-[13px] font-medium cursor-pointe text-center uppercase "
            onClick={() => {
              alert("Tao chưa được xử lí nè");
            }}
          >
            <span>Thêm vào giỏ</span>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default QuickView;
{
  /* <div className="">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border-none"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={
                          " py-[10px]  text-[13px] font-bold text-redichi bg-[#fafafa] px-[6px] border-none"
                        }
                      >
                        Quà tặng
                      </AccordionTrigger>
                      <AccordionContent className={"p-[10px] border-none"}>
                        <div className="flex flex-col max-h-[30vh] ">
                          {[1, 2].map((giftId) => (
                            <label
                              key={giftId}
                              className="flex items-center cursor-pointer overflow-hidden radio py-[6px] border-b border-solid border-[#eee] pl-[4px] hover:bg-[#fafafa] transition-all duration-150 ease-linear"
                              htmlFor={`gift-${giftId}`}
                            >
                              <input
                                type="radio"
                                name="gift"
                                value={giftId}
                                id={`gift-${giftId}`}
                                className="p-[6px]"
                                checked={selectedGift === String(giftId)}
                                onChange={handleGiftChange}
                              />
                              <div className="flex-auto w-[300px] px-[8px] flex items-center ">
                                <div className="w-[45px]">
                                  <div className="pb-[100%] relative ">
                                    <div className="absolute inset-0">
                                      <LazyLoadImage
                                        src="https://image.hsv-tech.io/400x0/bbx/products/5b1e3778-6e2a-45d6-b437-8ae51ba54d93.webp"
                                        effect="blur"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="flex-shrink-0 flex-auto pr-[30px]
                                 relative"
                                >
                                  <a
                                    href="/"
                                    className="text-blacknitext-[10px] font-normal flex items-center cursor-pointer absolute right-0 bottom-0 hover:text-redni group underline"
                                  >
                                    Xem chi tiết{" "}
                                    <ChevronsRight
                                      size={16}
                                      className="stroke-blacknigroup-hover:stroke-second"
                                      strokeWidth={0.6}
                                    />
                                  </a>
                                  <span className="font-semibold text-[13px] hover:text-redichi line-clamp-1 ">
                                    Đệm Trang Trí Vải Cotton Nhiều Màu ROSABELLA{" "}
                                    {giftId}
                                  </span>
                                  <a
                                    href="/thuong-hieu"
                                    className="text-vendor hover:text-redichi uppercase text-[13px] "
                                  >
                                    <span className="text-[12px] text-vendor normal-case">
                                      thương hiệu:{" "}
                                    </span>
                                    Anna
                                  </a>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div> */
}
