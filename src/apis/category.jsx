import apiAxios from "@/configs/axios";

export const getCategory = async (
  slug,
  currentPage,
  sort,
  vendors = [],
  price_range = []
) => {
  const response = await apiAxios.get(
    `/api/categories/category-detail/${slug}`,
    {
      params: {
        sort: sort,
        page: currentPage,
        vendor: vendors,
        price_range: price_range,
      },
    }
  );
  return response;
};
export const getCollection = async (
  slug,
  currentPage,
  sort,
  vendors = [],
  price_range = []
) => {
  const response = await apiAxios.get(
    `/api/collections/collection-detail/${slug}`,
    {
      params: {
        sort: sort,
        page: currentPage,
        vendor: vendors,
        price_range: price_range,
      },
    }
  );
  return response;
};
