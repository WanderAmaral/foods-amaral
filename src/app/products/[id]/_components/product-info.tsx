"use client";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Prisma } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";
import Cart from "@/app/_components/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
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
import { signIn } from "next-auth/react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>[];
  isAuthenticated: boolean;
}

const ProductInfo = ({ product, complementaryProducts, isAuthenticated }: ProductInfoProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const [quantity, setQuantity] = useState(1);

  const { addProductToCart, products } = useContext(CartContext);

  useEffect(() => {
    if (products.length <= 0) {
      setIsCartOpen(false);
    }
  }, [products]);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddProductToCart = () => {
    if(!isAuthenticated) {
      return signIn('google')
    }
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }
    addToCart({
      emptyCart: false,
    });
  };

  const handleClickIncreaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleClickDecreaseQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;

      return prevState - 1;
    });
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white p-4">
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>
          <span className=" text-muted-foreground line-through">
            De: {formatCurrency(Number(product.price))}
          </span>
        </div>
        <div className="flex items-center gap-3 text-center">
          <Button
            onClick={handleClickDecreaseQuantity}
            size={"sm"}
            variant={quantity === 1 ? "ghost" : "default"}
          >
            <ChevronLeftIcon size={15} />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size={"sm"} onClick={handleClickIncreaseQuantity}>
            <ChevronRightIcon size={15} />
          </Button>
        </div>
      </div>
      <Card className="mt-6 flex justify-around py-3">
        {/* Custo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon />
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon />
          </div>

          <p className="text-sm font-semibold">
            {product.restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className=" text-justify text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
      <div className="mt-6">
        <Button
          onClick={handleAddProductToCart}
          className="w-full font-semibold"
        >
          Adicionar à sacola
        </Button>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="px-4">
          <SheetHeader>
            <SheetTitle>Sacola</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col gap-4 py-5">
            <Cart setIsOpen={setIsCartOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent className="w-[85%] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja memso adicionar esse produto? Isso limpará sua sacola atual
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductInfo;
