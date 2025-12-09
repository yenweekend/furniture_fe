import React from "react";

const OrderInstruction = () => {
  React.useEffect(() => {
    document.title = "Hướng dẫn đặt hàng - Baya";
  }, []);
  return (
    <div className="pb-10 pt-[10px]">
      <h1 className="text-[22px] mb-5 font-bold text-redtitle">
        Hướng dẫn đặt hàng
      </h1>
      <div className="content-pageDetail typeList-style">
        <p>
          Bạn có thể mua sắm dễ dàng tại trang&nbsp;<strong>www.baya.vn</strong>
          &nbsp;với các bước đặt hàng đơn giản như sau:
        </p>
        <p>1. Chọn sản phẩm</p>
        <p>2. Thêm vào giỏ/ Mua hàng</p>
        <p>3. Xem giỏ hàng</p>
        <p>4. Nhập mã khuyến mãi (nếu có)</p>
        <p>5. Thanh toán</p>
        <p>6. Tick chọn vào ô&nbsp;Thông tin xuất hoá đơn điện tử (nếu cần)</p>
        <p>7. Đăng nhập (hoặc Đăng ký nếu chưa có tài khoản)</p>
        <p>8. Đặt hàng</p>
        <p>BAYA cũng sẵn sàng phục vụ bạn qua các kênh sau:</p>
        <p>• Cửa sổ Trò chuyện trực tuyến trên trang baya.vn</p>
        <p>• Email: webshop@baya.vn</p>
        <p>
          • Trang&nbsp;
          <strong>
            <a
              title="Facebook BAYA Siêu Thị Nội Thất"
              target="_blank"
              rel="noopener"
              href="https://www.facebook.com/bayavietnam"
            >
              Facebook BAYA Siêu Thị Nội Thất
            </a>
          </strong>
        </p>
        <p>
          • Hotline:&nbsp;<strong>1900 63 64 76</strong>&nbsp;(từ 8h - 21h)
        </p>
      </div>
    </div>
  );
};

export default OrderInstruction;
