import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import DiscountBadge from "@/app/_components/discount-badge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: { id },
    include: { restaurant: true },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      <div className="p-5">
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
              {product.discountPercentage && (
                <DiscountBadge product={product} />
              )}
            </div>
            <span className=" text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button size={"sm"}>
              <ChevronLeftIcon size={15} />
            </Button>
            <span>1</span>
            <Button size={"sm"}>
              <ChevronRightIcon size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
