import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`}>
      <div className="flex justify-center items-center gap-3 rounded-full px-4 py-3 shadow-md bg-white h-full">
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
