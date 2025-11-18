import apiAxios from "@/configs/axios";

export const getHome = async () => {
  const response = await apiAxios.get(`/api/home/get`);
  return response;
};

export const getSearch = async (key, page, sort) => {
  const response = await apiAxios.get(`/api/search?q=${key}`, {
    params: {
      sort,
      page,
    },
  });
  return response;
};
