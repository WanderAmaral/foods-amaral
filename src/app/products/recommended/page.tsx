import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: { discountPercentage: { gt: 0 } },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className=" space-y-2 px-5">
      <Header />

      <h2 className="py-3 text-lg font-semibold">Produtos recomendados</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProductsPage;
