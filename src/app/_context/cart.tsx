"use client";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void;
  decreaseProductToCart: (productId: string) => void;
  increaseProductToCart: (productId: string) => void;
  removeProductToCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  decreaseProductToCart: () => {},
  increaseProductToCart: () => {},
  removeProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

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
        addProductToCart,
        decreaseProductToCart,
        increaseProductToCart,
        removeProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
