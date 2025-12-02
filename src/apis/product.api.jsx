import apiAxios from "@/configs/axios";

export const getProductDetail = async (slug) => {
  const response = await apiAxios.get(`/api/products/product-detail/${slug}`);
  return response;
};
export const getViewdProduct = async (slugs) => {
  const response = await apiAxios.get(`/api/products/viewed?slugs=${slugs}`);
  return response;
};
export const giveFeedBack = async (data) => {
  const response = await apiAxios.post(`/api/products/feedback`, data);
  return response;
};
