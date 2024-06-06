/* eslint-disable no-unused-vars */
"use client";
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: { restaurant: { select: { deliveryFee: true } } };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  addProductToCart: (product: Product, quantity: number) => void;
  decreaseProductToCart: (productId: string) => void;
  increaseProductToCart: (productId: string) => void;
  removeProductToCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  totalPrice: 0,
  subtotalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreaseProductToCart: () => {},
  increaseProductToCart: () => {},
  removeProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  // USEMEMO ==> Só quero calcular se o products (produtos) mudar
  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts = subtotalPrice - totalPrice;

  const decreaseProductToCart = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.quantity === 1) {
          return cartProduct;
        }

        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const increaseProductToCart = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductToCart = (productId: string) => {
    return setProducts((prevState) =>
      prevState.filter((product) => product.id !== productId),
    );
  };

  const addProductToCart = (product: Product, quantity: number) => {
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscounts,

        addProductToCart,
        decreaseProductToCart,
        increaseProductToCart,
        removeProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
