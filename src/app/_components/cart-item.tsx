"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2 } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { CartContext, CartProduct } from "../_context/cart";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductToCart, increaseProductToCart, removeProductToCart } =
    useContext(CartContext);

  const handleDecreaseProduct = () => {
    decreaseProductToCart(product.id);
  };

  const handleIncreaseProduct = () => {
    increaseProductToCart(product.id);
  };

  const handleRemoveProductToCart = () => {
    removeProductToCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* PARTE DIREITA (FOTO E NOME) */}

        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent lg:h-[120px] lg:w-[120px]">
          <Image
            src={product.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-xs lg:text-sm">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold lg:text-base">
              {formatCurrency(
                calculateProductTotalPrice(product) * product.quantity,
              )}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 lg:text-sm">
                {formatCurrency(Number(product.price) * product.quantity)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 lg:gap-3">
            <Button
              size="icon"
              variant={product.quantity === 1 ? "secondary" : "default"}
              className="h-8 w-8 lg:h-9 lg:w-9"
              onClick={handleDecreaseProduct}
            >
              <ChevronLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>

            <span className="text-xs lg:text-sm">{product.quantity}</span>

            <Button
              size="icon"
              variant="default"
              className="h-8 w-8 lg:h-9 lg:w-9"
              onClick={handleIncreaseProduct}
            >
              <ChevronRightIcon className=" lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant='secondary'
        onClick={handleRemoveProductToCart}
        className="h-8 w-8 lg:h-9 lg:w-9"
      >
        <Trash2 className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
