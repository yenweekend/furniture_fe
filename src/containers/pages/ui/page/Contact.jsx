import { Calendar, Mail, MapPin, PhoneCall } from "lucide-react";
import React from "react";

const Contact = () => {
  React.useEffect(() => {
    document.title = "Liên hệ - Baya";
  }, []);
  return (
    <div className="max-w-[1400px] mx-auto py-[25px] px-[30px] flex ">
      <div className="basis-1/2 flex flex-col">
        <div className="p-[15px] bg-[#fff] mb-[15px]">
          <h3 className="text-redichi font-bold text-[20px] mb-5">
            Thông tin liên hệ
          </h3>
          <div className="flex items-stretch  flex-wrap ">
            <div className="basis-1/2 flex mb-[10px] pr-[20px]">
              <div className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
                <MapPin size={16} stroke="#333" />
              </div>
              <div className="ml-[15px]">
                <strong>Địa chỉ</strong>
                <span className="text-[#696969] font-normal block">
                  Tầng 08, Tòa nhà Pearl Plaza, Số 561A Điện Biên Phủ, Phường
                  25, Quận Bình Thạnh, Thành phố Hồ Chí Minh
                </span>
              </div>
            </div>
            <div className="basis-1/2 flex mb-[10px] pr-[20px]">
              <div className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
                <Calendar size={16} stroke="#333" />
              </div>
              <div className="ml-[15px]">
                <strong>Thời gian làm việc</strong>
                <span className="text-[#696969] font-normal block">
                  Từ 8h00 đến 17h00 hàng ngày
                </span>
              </div>
            </div>
            <div className="basis-1/2 flex mb-[10px] pr-[20px]">
              <div className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
                <PhoneCall size={16} stroke="#333" />
              </div>
              <div className="ml-[15px]">
                <strong>Điện thoại</strong>
                <span className="text-[#696969] font-normal block">
                  1900 63 64 76
                </span>
              </div>
            </div>
            <div className="basis-1/2 flex mb-[10px] pr-[20px]">
              <div className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
                <Mail size={16} stroke="#333" />
              </div>
              <div className="ml-[15px]">
                <strong>Email</strong>
                <span className="text-[#696969] font-normal block">
                  webshop@baya.vns
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-[15px] bg-[#fff]">
          <h3 className="text-redichi font-bold text-[20px] mb-5">
            Gửi thắc mắc cho chúng tôi
          </h3>
          <p className="font-normal text-[14px]">
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng
            tôi sẽ liên lạc lại với bạn sớm nhất có thể .
          </p>
        </div>
      </div>
      <div className="basis-1/2 px-[15px]">
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3578.7009675192567!2d105.791334!3d21.025618!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86eedb2f5f%3A0xe54aaab54f5328b5!2sLuxury%20Park%20Views!5e1!3m2!1svi!2sus!4v1737641295134!5m2!1svi!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
