import apiAxios from "@/configs/axios";
export const create = async (data) => {
  const response = await apiAxios.post(`/api/orders/create`, data);
  return response;
};
export const getPurchased = async () => {
  const response = await apiAxios.get(`/api/orders/get`);
  return response;
};
export const getPurchaserInfo = async () => {
  const response = await apiAxios.get(`/api/orders/purchaser-info`);
  return response;
};
export const getCoupon = async (data) => {
  const response = await apiAxios.get(
    `/api/orders/get-coupon?code=${data.code}&total=${data.totalPrice}`
  );
  return response;
};
