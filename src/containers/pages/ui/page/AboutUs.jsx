import React from "react";

const AboutUs = () => {
  React.useEffect(() => {
    document.title = "Giới thiệu - Baya";
  }, []);
  return (
    <div className="pb-10 pt-[10px]">
      <h1 className="text-[22px] mb-5 font-bold text-redtitle">Giới thiệu</h1>
      <div className="">
        <h2 className="text-[32px] text-redtitle text-center mb-[13px]">
          Câu chuyện thương hiệu
        </h2>
        <p className="text-center text-[16px] font-normal pb-5">
          Lấy cảm hứng từ loài chim được mệnh danh là "Kiến trúc sư của thiên
          nhiên", cái tên BAYA đã được lựa chọn để viết tiếp câu chuyện cho
          thương hiệu nội thất hàng đầu Việt Nam.
        </p>
        <p className=" text-[16px] font-normal pb-5">
          <strong>Tầm nhìn:</strong> Trở thành thương hiệu nội thất và trang trí
          hàng đầu Việt Nam, góp phần xây dựng thêm nhiều tổ ấm mỗi ngày.
        </p>
        <p className=" text-[16px] font-normal pb-5">
          <strong>Sứ mệnh</strong>: Mang đến những sản phẩm và dịch vụ thiết kế
          nội thất phù hợp nhất cho mọi người.
        </p>
        <p className=" text-[16px] font-bold pb-5 uppercase italic">
          vì sao nên chọn chúng tôi ?
        </p>
        <p className=" text-[16px] text-redichi font-bold pb-5 uppercase ">
          1. dịch vụ hẫu mãi hấp dẫn
        </p>
        <p className=" text-[16px] text-redichi font-bold pb-5 uppercase ">
          2. ĐỘI NGŨ NHÂN VIÊN
          <span className="text-[16px] font-normal text-blackni normal-case block">
            Tận tâm và không ngừng đổi mới với mong muốn mang lại dịch vụ tốt
            nhất cho khách hàng
          </span>
        </p>
        <p className=" text-[16px] text-redichi font-bold pb-5 uppercase ">
          3. DỊCH VỤ TƯ VẤN & THIẾT KẾ NỘI THẤT CHUYÊN NGHIỆP
          <span className="text-[16px] font-normal text-blackni normal-case block">
            Phí thiết kế tốt nhất thị trường
          </span>
          <span className="text-[16px] font-normal text-blackni normal-case block">
            Thời gian hoàn thiện nhanh 3-5 ngày
          </span>
          <span className="text-[16px] font-normal text-blackni normal-case block">
            Thiết kế và thi công trọn gói
          </span>
          <span className="text-[16px] font-normal text-blackni normal-case block italic">
            * Đối với các công trình sử dụng đồ có sẵn tại BAYA *
          </span>
        </p>
        <p className="text-center flex items-center justify-center pb-[15px]">
          <img
            src="https://file.hstatic.net/200000796751/file/banner-ve-chung-toi_eb9db66f1e3848a49309a400671c6320_grande.jpg"
            alt=""
            className=""
          />
        </p>
        <p className=" text-[16px] text-redichi font-bold pb-5 uppercase text-center ">
          ĐỒNG HÀNH CÙNG GIA ĐÌNH VIỆT
        </p>
        <span className="text-[16px] font-normal text-blackni normal-case block italic text-justify">
          "Trong suốt chặng đường 14 năm của mình, BAYA đã có cơ hội đồng hành
          cùng hàng trăm ngàn khách hàng, chung tay dựng xây nên những gia đình
          trên khắp Việt Nam. Hãy cùng BAYA tiếp tục hành trình kiến tạo nên
          những tổ ấm tươi đẹp, bởi đối với chúng tôi, nhà không chỉ là nơi dừng
          chân mà còn là nơi nuôi dưỡng những tâm hồn, nơi những giá trị văn hoá
          Việt được kế thừa và phát huy."
        </span>
      </div>
    </div>
  );
};

export default AboutUs;
