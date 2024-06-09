import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryListSheet = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex flex-col items-start gap-3">
      {categories.map((category) => (
        <CategoryItem
          category={category}
          key={category.id}
          className="bg- rounded-none shadow-none"
        />
      ))}
    </div>
  );
};

export default CategoryListSheet;
