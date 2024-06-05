import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { formatCurrency } from "../_helpers/price";

const Cart = () => {
  const { products, totalPrice, totalDiscounts, subtotalPrice } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col justify-between py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {products.length > 0 && (
          <Card>
            <CardContent className="flex flex-col gap-4 p-3">
              <div className="flex justify-between">
                <span className=" text-xs text-muted-foreground">Subtotal</span>
                <p className="text-xs text-[#323232]">
                  R$:{" "}
                  {Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  }).format(subtotalPrice)}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className=" text-xs text-muted-foreground">Entrega</span>
                <p className="text-xs text-[#323232]">
                  {Number(products[0].restaurant.deliveryFee) === 0 ? (
                    <span className="bg-red-400 font-medium uppercase">
                      Grátis
                    </span>
                  ) : (
                    formatCurrency(Number(products[0].restaurant.deliveryFee))
                  )}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className=" text-xs text-muted-foreground">
                  Descontos
                </span>
                <p className="text-xs text-[#323232]">
                  {" "}
                  - R$:{" "}
                  {Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  }).format(totalDiscounts)}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className=" text-xs text-muted-foreground">Total</span>
                <p className="text-xs text-[#323232]">
                  R$:{" "}
                  {Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  }).format(totalPrice)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        <Button className="w-full">Finalizar pedido</Button>
      </div>
    </div>
  );
};

export default Cart;
