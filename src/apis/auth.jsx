import apiAxios from "@/configs/axios";
export const register = async (formData) => {
  const response = await apiAxios.post(`/api/v1/auth/register`, formData);
  return response;
};

export const login = async (formData) => {
  const response = await apiAxios.post(`/api/v1/auth/login`, formData, {
    withCredentials: true,
  });
  return response;
};

export const logout = async () => {
  const response = await apiAxios.get(`/api/v1/auth/logout`);
  return response;
};
export const getAddresses = async () => {
  const response = await apiAxios.get(`/api/addresses/get`);
  return response;
};
export const getAccount = async () => {
  const response = await apiAxios.get(`/api/v1/auth/account`);
  return response;
};
