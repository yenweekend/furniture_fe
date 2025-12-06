import apiAxios from "@/configs/axios";
const assignAccessToken = (token) => {
  if (token) {
    apiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiAxios.defaults.headers.common["Authorization"];
  }
};
export default assignAccessToken;
