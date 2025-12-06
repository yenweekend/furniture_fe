import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateQuantity } from "@/apis/cart";
import { debounce } from "lodash";
import useMessage from "@/hooks/useMessage";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
const UpdateQuantity = ({ product, isRounded = false }) => {
  const messageApi = useMessage();
  const { id, stock } = product;
  const [quantity, setQuantity] = React.useState(parseInt(product.quantity));
  React.useEffect(() => {
    setQuantity(parseInt(product.quantity));
  }, [product]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.response.data.msg || "Cập nhật khỏi giỏ hàng thất bại!",
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
        mutate({ productId: id, quantity: newQuantity });
      }, 400),
    [mutate, id]
  );

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      if (stock - newQuantity < 0) {
        messageApi.open({
          type: "error",
          content: "Số lượng vượt quá sản phẩm trong kho",
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
        messageApi.open({
          type: "error",
          content: "Số lượng mua phải lớn hơn 0",
          className: "custom-class",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
        return prev;
      }
      const newQuantity = prev - 1;
      debouncedUpdateQuantity(newQuantity);
      return newQuantity;
    });
  };
  if (!isRounded) {
    return (
      <div className="flex items-center mt-2">
        {isPending ? (
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
    );
  }
  return (
    <div className="flex items-center border border-solid border-[#f3f4f4] rounded-full py-1">
      {isPending ? (
        <Button
          disabled
          className={
            " flex-auto w-[100px] h-[20px] border border-solid border-[#333] rounded-full bg-[#fff]"
          }
        >
          <div
            className="  rounded-[3px] text-center  w-[28px] flex items-center justify-center cursor-pointer"
            onClick={handleDecrease}
          >
            <Minus className="text-blackni" size={16} />
          </div>
          <Loader2 className="animate-spin" stroke="#333" />

          <div
            className="  rounded-[3px] text-center  w-[28px] flex items-center justify-center cursor-pointer"
            onClick={handleIncrease}
          >
            <Plus className="text-blackni" size={16} />
          </div>
        </Button>
      ) : (
        <>
          <button
            className="  rounded-[3px] text-center  w-[28px] flex items-center justify-center cursor-pointer"
            onClick={handleDecrease}
          >
            <Minus className="text-blackni" size={16} />
          </button>
          <input
            type="text"
            readOnly
            value={quantity}
            className="text-[14px] font-bold text-[#252a2b]  text-center  w-[38px] bg-[#fff] flex items-center justify-center"
          />

          <button
            className="  rounded-[3px] text-center  w-[28px] flex items-center justify-center cursor-pointer"
            onClick={handleIncrease}
          >
            <Plus className="text-blackni" size={16} />
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateQuantity;
