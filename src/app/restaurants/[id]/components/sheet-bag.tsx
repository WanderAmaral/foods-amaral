"use client";
import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { useContext, useState } from "react";

const SheetBag = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, totalPrice } = useContext(CartContext);

  return (
    <>
      {products.length > 0 && (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <div className="flex justify-between py-4 px-4 fixed bottom-0  bg-white w-full">
            <div>
              <h1 className="text-xs text-foreground">Total sem entrega</h1>
              <div className="flex gap-2 items-center">
                <span className="font-semibold">R$ 
                  {Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  }).format(totalPrice)}
                </span>
                <span className="text-xs text-foreground">/ 1 item</span>
              </div>
            </div>
            <div>
              <SheetTrigger className="flex justify-between px-4" asChild>
                <Button>Ver Sacola</Button>
              </SheetTrigger>
            </div>
          </div>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sacola</SheetTitle>
            </SheetHeader>
            <div className="flex h-full flex-col gap-4 py-5">
              <Cart setIsOpen={setIsCartOpen} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default SheetBag;
