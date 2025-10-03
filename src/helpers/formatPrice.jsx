const formatPrice = (price) => {
  let roundedNumber = Math.round(price / 1000) * 1000;
  let formattedNumber = roundedNumber.toLocaleString();
  return `${formattedNumber.replaceAll(".", ",")}₫`;
};
export default formatPrice;
