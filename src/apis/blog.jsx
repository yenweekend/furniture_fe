import apiAxios from "@/configs/axios";

export const getBlog = async (slug) => {
  const response = await apiAxios.get(`/api/blogs/get/${slug}`);
  return response;
};
export const getBlogDetail = async (slug) => {
  const response = await apiAxios.get(`/api/blogs/detail/get/${slug}`);
  return response;
};
export const getLatestBLogs = async () => {
  const response = await apiAxios.get(`/api/blogs/latest-blogs`);
  return response;
};
