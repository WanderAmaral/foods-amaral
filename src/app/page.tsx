import { ChevronRightIcon } from "lucide-react";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";

export default async function Home() {

  const products = await db.product.findMany({
    where: { discountPercentage: { gt: 0 } },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="px-5">
      <Header />
      <div className="pt-6">
        <Search />
      </div>
      <div className="pt-6">
        <CategoryList />
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between">
          <h1 className="py-4 text- font-bold">Pedidos recomendados</h1>
          <Button variant={"link"} className="p-0 h-fit">
            Ver todos
            <ChevronRightIcon  size={20}/>
          </Button>
        </div>
        <ProductList products={products}/>
      </div>
    </main>
  );
}
