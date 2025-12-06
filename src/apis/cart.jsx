import apiAxios from "@/configs/axios";
export const add = async (formData) => {
  const response = await apiAxios.post(`/api/carts/add`, formData); //{id: 'abc', payload: 3}
  return response;
};
export const get = async () => {
  const response = await apiAxios.get(`/api/carts/cart`);
  return response;
};
export const deleteItem = async (productId) => {
  const response = await apiAxios.delete(`/api/carts/delete/${productId}`);
  return response;
};
export const updateQuantity = async (data) => {
  const response = await apiAxios.patch(`/api/carts/update/${data.productId}`, {
    quantity: data.quantity,
  });
  return response;
};
