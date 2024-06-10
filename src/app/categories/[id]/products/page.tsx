import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: { id: string };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
        take: 10,
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <div className=" space-y-2 px-5">
      <Header />

      <h2 className="py-3 text-lg font-semibold">{category?.name}</h2>
      <div className="grid grid-cols-2 gap-6">
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
