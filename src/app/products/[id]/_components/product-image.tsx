"use client";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <div className="relative h-[360px] w-full lg:sticky lg:h-[500px] lg:w-[600px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover md:rounded-xl"
      />
      <Button
        className="absolute left-4 top-4 rounded-3xl bg-white text-foreground md:hidden"
        variant={"secondary"}
        size={"icon"}
        onClick={handleClickBack}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
