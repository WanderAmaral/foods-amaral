import { useContext } from "react";
import { CartContext } from "../_context/cart";

import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {products.map((product) => (
        <CartItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Cart;
