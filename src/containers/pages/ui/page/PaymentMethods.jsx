import React from "react";

const PaymentMethods = () => {
  React.useEffect(() => {
    document.title = "Chính sách thanh toán - Baya";
  }, []);
  return (
    <div className="pb-10 pt-[10px]">
      <h1 className="text-[22px] mb-5 font-bold text-redtitle">
        Các hình thức thanh toán
      </h1>
      <div className="content-pageDetail typeList-style">
        <p>
          <strong>Chính sách thanh toán</strong>
        </p>
        <p>
          Có 3 hình thức thanh toán, khách hàng có thể lựa chọn hình thức thuận
          tiện và phù hợp với mình nhất:
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Cách 1: Thanh toán tiền mặt</strong>
        </p>
        <p>
          Quý khách có thể thanh toán tiền mặt trực tiếp khi mua hàng tại Hệ
          thống Cửa hàng Nội thất Baya, hoặc thanh toán cho nhân viên chuyển
          phát đối với hình thức chuyển phát COD khi mua hàng online qua website{" "}
          <strong>
            <u>
              <a href="http://baya.vn">baya.vn</a>
            </u>
          </strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Cách 2: Thanh toán quét mã VNPAY-QR</strong>
        </p>
        <p>
          Thanh toán VNPAY-QR là hình thức thanh toán tiên phong cho xu thế tiêu
          dùng không dùng tiền mặt tương lai. Thao tác thanh toán an toàn, đơn
          giản, nhanh chóng và bảo mật cấp cao. Chỉ cần sử dụng app Mobile
          Banking ngân hàng của Quý khách và quét mã VNPAY-QR để thanh toán. Bên
          cạnh đó, thanh toán bằng VNPAY-QR, Quý khách sẽ luôn được hưởng những
          ưu đãi giảm giá đặc biệt. Chi tiết ưu đãi và hướng dẫn thanh toán
          VNPAY-QR Quý khách có thể tham khảo{" "}
          <u>
            <strong>
              <a href="https://baya.vn/pages/huong-dan-thanh-toan-vnpay-qr-tren-website">
                TẠI ĐÂY
              </a>
            </strong>
          </u>
          . VNPAY-QR được áp dụng thanh toán tại tất cả Hệ thống Cửa hàng Nội
          thất Baya&nbsp;và website{" "}
          <u>
            <strong>
              <a href="http://baya.vn">baya.vn</a>
            </strong>
          </u>
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Cách 3: Chuyển khoản trước</strong>
        </p>
        <p>
          Quý khách vui lòng chuyển khoản trước, sau đó chúng tôi tiến hành giao
          hàng theo thỏa thuận hoặc hợp đồng với Quý khách.
        </p>
        <p>
          <strong>
            Thông tin tài khoản: 1027565352 –&nbsp;Vietcombank CN Tân Bình
            -&nbsp;Công ty CP Nội thất Baya
          </strong>
        </p>
        <p>
          <em>*Lưu ý:</em>
        </p>
        <p>
          Nội dung chuyển khoản: ghi rõ&nbsp;
          <strong>Số điện thoại&nbsp;</strong>hoặc&nbsp;
          <strong>Số đơn hàng</strong>Sau khi chuyển khoản, chúng tôi sẽ liên hệ
          xác nhận và tiến hành giao hàng.
        </p>
        <p>
          Nếu sau thời gian thỏa thuận mà chúng tôi không giao hàng hoặc không
          phản hồi lại, quý khách có thể gửi khiếu nại trực tiếp về địa chỉ trụ
          sở
        </p>
        <p>
          Đối với khách hàng có nhu cầu mua số lượng lớn để kinh doanh hoặc buôn
          sỉ vui lòng liên hệ trực tiếp với chúng tôi để có chính sách giá cả
          hợp lý. Và việc thanh toán sẽ được thực hiện theo hợp đồng.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
