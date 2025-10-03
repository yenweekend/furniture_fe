import apiAxios from "@/configs/axios";

export const getHome = async () => {
  const response = await apiAxios.get(`/api/home/get`);
  return response;
};

//TODO SEARCH
