import React, { forwardRef } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CloseButton } from "..";
import _ from "lodash";
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

//TODO CART
export { Slider };

const QuickView = ({ className, children, data }) => {
  return "product detail";
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
