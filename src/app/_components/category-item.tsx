import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface CategoryItemProps {
  category: Category;
  className?: string;
}

const CategoryItem = ({ category, className }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`}>
      <div
        className={cn(
          "flex h-full items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md", className
        )}
      >
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={30}
          height={30}
        />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
