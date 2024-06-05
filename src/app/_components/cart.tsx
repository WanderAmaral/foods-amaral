import { useContext } from "react";
import { CartContext } from "../_context/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Product } from "@prisma/client";

interface CartProps {
    product: Product
}

const Cart = ({product}: CartProps) => {
  const { products, addProductToCart } = useContext(CartContext);

  const handleAddProductToCart = () => {
    addProductToCart(product);
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleAddProductToCart} className="w-full font-semibold">Adicionar à sacola</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
            <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
            {products.map((product) => <div key={product.id}>{product.name}</div>)}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
