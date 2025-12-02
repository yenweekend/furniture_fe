import axios from "axios";
import apiAxios from "@/configs/axios";
export const getProvince = async () => {
  // lấy tất cả tỉnh thành
  const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
  return response;
};
export const getDistrict = async (provinceId) => {
  // lấy tỉnh thành và các huyện của nó
  const response = await axios.get(
    `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
  );
  return response;
};
export const getWard = async (districtId) => {
  // lấy huyện và xã phường của nó
  const response = await axios.get(
    `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
  );
  return response;
};
export const getAny = async (id) => {
  const response = await axios.get(
    `https://esgoo.net/api-tinhthanh/5/${id}.htm`
  );
  return response;
};
export const update = async (data) => {
  const response = await apiAxios.patch(
    `/api/addresses/update/${data.id}`,
    data.formData
  );
  return response;
};
