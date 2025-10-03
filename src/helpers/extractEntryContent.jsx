const extractFirstPTag = (htmlString) => {
  const regex = /<p>(.*?)<\/p>/i;
  const match = regex.exec(htmlString);
  if (match) {
    // Remove any HTML tags from the matched content using a second regex
    return match[1].replace(/<[^>]*>/g, "");
  }
  return "";
};
export default extractFirstPTag;
