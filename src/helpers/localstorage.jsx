const addToHistory = (keyword) => {
  if (!keyword) return;

  let history = getHistory();
  history = history.filter((item) => item !== keyword); // loại bỏ nếu trùng
  history.unshift(keyword); // thêm vào đầu

  // Giới hạn tối đa 5 phần tử
  history = history.slice(0, 5);

  localStorage.setItem("bay_history_search", history.join("##"));
};
const getHistory = () => {
  const data = localStorage.getItem("bay_history_search");
  return data ? data.split("##") : [];
};

const removeFromHistory = (keyword) => {
  let history = getHistory();
  history = history.filter((item) => item !== keyword);
  localStorage.setItem("bay_history_search", history.join("##"));
};

const removeManyFromHistory = (keywords) => {
  let history = getHistory();
  history = history.filter((item) => !keywords.includes(item));
  localStorage.setItem("bay_history_search", history.join("##"));
};

const saveViewedProduct = (productSlug) => {
  const key = "viewed";

  // Get existing viewed products from localStorage
  let viewedProducts = localStorage.getItem(key);

  // Convert to array or initialize empty array
  viewedProducts = viewedProducts ? viewedProducts.split("##") : [];

  // Remove the product if it already exists (to avoid duplicates)
  viewedProducts = viewedProducts.filter((item) => item !== productSlug);

  // Add the new product to the beginning
  viewedProducts.unshift(productSlug);

  // Keep only the latest 12 products
  if (viewedProducts.length > 12) {
    viewedProducts = viewedProducts.slice(0, 12);
  }

  // Save back to localStorage
  localStorage.setItem(key, viewedProducts.join("##"));
};
function getViewedProductSlugs() {
  // Get the search history from localStorage
  let viewedValue = localStorage.getItem("viewed") || "";
  return viewedValue.replaceAll("##", ",");
}
const addCheckoutItem = (productId) => {
  // Get existing checkout items from localStorage
  let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

  // Add productId only if it's not already in the list
  if (!checkoutItems.includes(productId)) {
    checkoutItems.push(productId);
    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
  }
};
const removeCheckoutItem = (productId) => {
  // Get existing checkout items from localStorage
  let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

  // Filter out the productId to be removed
  checkoutItems = checkoutItems.filter((id) => id !== productId);

  // Update localStorage
  localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
};
const getCheckoutItems = () => {
  return JSON.parse(localStorage.getItem("checkoutItems")) || [];
};
const removeMultipleCheckoutItems = (productIds) => {
  // Get existing checkout items from localStorage
  let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

  // Filter out productIds to be removed
  checkoutItems = checkoutItems.filter((id) => !productIds.includes(id));

  // Update localStorage
  localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
};
const updateCheckoutItems = (newIds) => {
  // Get existing checkout items from localStorage
  let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

  // Keep only IDs that are in both the existing and new list (duplicates)
  let updatedItems = checkoutItems.filter((id) => newIds.includes(id));

  // Add new IDs that are not already in the filtered list
  newIds.forEach((id) => {
    if (!updatedItems.includes(id)) {
      updatedItems.push(id);
    }
  });

  // Update localStorage
  localStorage.setItem("checkoutItems", JSON.stringify(updatedItems));
};

export {
  updateCheckoutItems,
  addCheckoutItem,
  removeMultipleCheckoutItems,
  removeCheckoutItem,
  getCheckoutItems,
  addToHistory,
  getHistory,
  removeFromHistory,
  removeManyFromHistory,
  saveViewedProduct,
  getViewedProductSlugs,
};
