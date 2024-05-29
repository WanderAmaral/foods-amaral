import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDown } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true } } };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] gap-3 space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {product.discountPercentage && (
          <div className="absolute left-0 top-0 m-2 flex items-center rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDown size={14} />
            <span className="text-xs font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate font-semibold">{product.name}</h2>
        <div className="flex items-center gap-3">
          <h3 className=" font-medium">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          <h2>
            {product.discountPercentage > 0 && (
              <span className=" text-sm text-slate-500 line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </h2>
        </div>
      </div>
      <span className=" block text-xs text-muted-foreground">
        {product.restaurant.name}
      </span>
    </div>
  );
};

export default ProductItem;
