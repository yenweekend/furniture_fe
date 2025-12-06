import axios from "axios";
import { apiUrl } from "./apiUrl";
import { Modal } from "antd";

const showSessionExpiredModal = () => {
  Modal.confirm({
    title: "Phiên đăng nhập đã hết hạn",
    content:
      "Đăng nhập ngay để mua sắm dễ dàng hơn, sử dụng những tiện ích mới nhất và tận hưởng thêm nhiều ưu đãi độc quyền dành cho thành viên Baya",

    onOk() {
      window.href = "/account/login";
    },
    onCancel() {},
  });
};

// Tạo instance của Axios
const api = axios.create({
  baseURL: apiUrl, // Thay bằng URL API của bạn
  withCredentials: true, // Quan trọng! Để gửi cookie khi request
});

// Interceptor xử lý response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Nếu lỗi 401 (Unauthorized) và request chưa được thử lại
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi API refresh token (cookie sẽ được gửi tự động do `withCredentials: true`)
        await axios.post(
          `${apiUrl}/api/v1/auth/refreshtoken`,
          {},
          {
            withCredentials: true, // Quan trọng! Để gửi và nhận cookie
          }
        );
        return api(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);

        console.error("Không thể lấy lại access token, cần đăng nhập lại.");
        showSessionExpiredModal();

        // Chuyển hướng đến trang đăng nhập hoặc thông báo cho người dùng
        // Ví dụ: window.location.href = '/login';
        //show modal require user to login or register
      }
    }
    return Promise.reject(error);
  }
);

export default api;
