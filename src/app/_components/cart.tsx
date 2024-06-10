"use client";
import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { formatCurrency } from "../_helpers/price";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import { Check, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { createOrder } from "@/_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const { products, totalPrice, totalDiscounts, subtotalPrice, clearCart } =
    useContext(CartContext);
  const { data } = useSession();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  if (!products) {
    return notFound();
  }

  const handleFinishOrderClick = async () => {
    const restaurant = products?.[0].restaurant;
    try {
      if (!data?.user) return;
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: { connect: { id: restaurant.id } },
        status: OrderStatus.CONFIRMED,
        user: { connect: { id: data?.user.id } },
      });
      setIsOpen(false);
      clearCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col py-3 ">
      <div className="flex-auto space-y-4">
        {products.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {products.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className=" text-xs text-muted-foreground">
                      Subtotal
                    </span>
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
                    <span className=" text-xs text-muted-foreground">
                      Entrega
                    </span>
                    <p className="text-xs text-[#323232]">
                      {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                        <span className="font-medium uppercase">Grátis</span>
                      ) : (
                        formatCurrency(
                          Number(products?.[0].restaurant.deliveryFee),
                        )
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
                    <span className=" text-xs text-muted-foreground">
                      Total
                    </span>
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
            </div>
            <Button
              onClick={() => setIsConfirmDialogOpen(true)}
              className="w-full"
            >
              Finalizar pedido
            </Button>
          </div>
        )}
      </div>
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className=" flex w-[85%] flex-col rounded-xl ">
          <AlertDialogHeader>
            <div className="flex justify-center">
              <Check
                className="h-16 w-16 rounded-full bg-[#EA1D2C] p-4 text-white"
                size={30}
              />
            </div>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;
