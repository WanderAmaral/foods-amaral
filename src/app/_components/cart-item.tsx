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
    <div className="flex items-center justify-between px-2">
      <div className="flex gap-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={100}
          height={0}
          className="rounded-lg object-cover shadow-md"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-sm">{product.name}</h1>
          <div className="flex  gap-2">
            <h3 className="font-bold ">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            <h2>
              {product.discountPercentage > 0 && (
                <span className=" text-xs text-slate-500 line-through">
                  {formatCurrency(Number(product.price))}
                </span>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-center">
            <Button
              onClick={handleDecreaseProduct}
              size={"sm"}
              variant={product.quantity === 1 ? "secondary" : "default"}
            >
              <ChevronLeftIcon size={15} />
            </Button>
            <span className="w-4">{product.quantity}</span>
            <Button onClick={handleIncreaseProduct} size={"sm"}>
              <ChevronRightIcon size={15} />
            </Button>
            {/* ATUALIZAR O VALOR DO PRODUTO BASEADO NA QUANTIDADE */}
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={handleRemoveProductToCart}
          size={"icon"}
          variant={"ghost"}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
