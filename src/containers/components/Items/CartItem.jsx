import * as React from "react";
import formatPrice from "@/helpers/formatPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Minus, Plus, X, Loader2 } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteItem, updateQuantity } from "@/apis/cart";
import useMessage from "@/hooks/useMessage";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
const CartItem = ({ product }) => {
  const messageApi = useMessage();
  const { id, thumbnail, title, price, stock } = product;
  const [quantity, setQuantity] = React.useState(parseInt(product.quantity));
  React.useEffect(() => {
    setQuantity(parseInt(product.quantity));
  }, [product]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content:
          error.response.data.msg || "Xóa sản phẩm khỏi giỏ hàng thất bại!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });
  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
  } = useMutation({
    mutationFn: updateQuantity,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.response.data.msg || "Cập nhật giỏ hàng thất bại!",
        className: "custom-class",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  });

  const debouncedUpdateQuantity = React.useMemo(
    () =>
      debounce((newQuantity) => {
        mutateUpdate({ productId: id, quantity: newQuantity });
      }, 1000),
    [mutateUpdate, id]
  );

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      if (stock - newQuantity < 0) {
        messageApi.open({
          type: "error",
          content: "Đã vượt quá sản lượng trong kho",
          className: "custom-class",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
        return prev;
      }
      debouncedUpdateQuantity(newQuantity);
      return newQuantity;
    });
  };
  // Decrease quantity (prevent going below 1)
  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        alert("Số lượng phải lớn hơn 0");
        return prev;
      }
      const newQuantity = prev - 1;
      debouncedUpdateQuantity(newQuantity);
      return newQuantity;
    });
  };

  return (
    <li className="flex px-[12px] border-b border-solid border-shop py-[20px]">
      <div className="w-[75px] h-[75px] overflow-hidden border border-solid cart-item mr-[15px] flex-shrink-0">
        <LazyLoadImage
          src={thumbnail}
          effect="blur"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <div className="font-semibold text-[14px] pr-[28px] text-blackni relative">
          <p className="line-clamp-2">{title}</p>
          <div
            className="absolute right-0 top-0 center-y cursor-pointer"
            onClick={() => mutate(id)}
          >
            {isPending ? (
              <Button disabled className={"p-0 bg-transparent "}>
                <Loader2 className="animate-spin" stroke="#333" />
              </Button>
            ) : (
              <X className="text-blackni" size={16} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-2">
            {isPendingUpdate ? (
              <Button
                disabled
                className={
                  " flex-auto w-[100px] h-[28px] border border-solid border-[#333] rounded-none py-1 bg-[#fff] flex items-center p-0 overflow-hidden"
                }
              >
                <span className="bg-[#f9f9f9] border border-solid border-[#f3f4f4] rounded-[3px] text-center h-[28px] w-[28px] flex items-center justify-center cursor-pointer">
                  <Minus className="text-blackni" size={16} />
                </span>
                <Loader2 className="animate-spin" stroke="#333" />

                <span className="bg-[#f9f9f9] border border-solid border-[#f3f4f4] rounded-[3px] text-center h-[28px] w-[28px] flex items-center justify-center cursor-pointer">
                  <Plus className="text-blackni" size={16} />
                </span>
              </Button>
            ) : (
              <>
                <button
                  className="bg-[#f9f9f9] border border-solid border-[#f3f4f4] rounded-[3px] text-center h-[28px] w-[28px] flex items-center justify-center cursor-pointer"
                  onClick={handleDecrease}
                >
                  <Minus className="text-blackni" size={16} />
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="text-[14px] font-bold text-[#252a2b] border border-solid border-[#f3f4f4] text-center h-[28px] w-[38px] bg-[#fff] flex items-center justify-center"
                />

                <button
                  className="bg-[#f9f9f9] border border-solid border-[#f3f4f4] rounded-[3px] text-center h-[28px] w-[28px] flex items-center justify-center cursor-pointer"
                  onClick={handleIncrease}
                >
                  <Plus className="text-blackni" size={16} />
                </button>
              </>
            )}
          </div>
          <span className="text-blacknitext-[14px] font-bold">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
