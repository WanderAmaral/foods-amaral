import { ChevronRightIcon } from "lucide-react";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurants-list";
import Link from "next/link";

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
    <main className="px-5 md:px-0">
      <div className="md:hidden">
        <Header />
      </div>

      <div className="pt-6 md:hidden">
        <Search />
      </div>
      <div className="mt-5 hidden h-[500px] bg-[#EA1D2C] md:block">
        <div className="container  flex h-full w-full items-center justify-center">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-3xl font-bold text-white">Está com Fome?</h1>
            <p className=" text-base text-white">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você
            </p>
            <Search />
          </div>
        </div>
      </div>
      <div className="pb-8 md:container md:mx-auto">
        <div className="pt-6">
          <CategoryList />
        </div>
        <div className="pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text- py-4 font-bold">Pedidos recomendados</h1>
            <Button asChild variant={"link"} className="h-fit p-0">
              <Link href={"/products/recommended"}>
                Ver todos
                <ChevronRightIcon size={20} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="pt-6">
          <div className="flex items-center justify-between ">
            <h1 className="text- py-4 font-bold">Restaurantes recomendados</h1>
            <Button asChild variant={"link"} className="h-fit p-0">
              <Link href={"/restaurants/recommended"}>
                Ver todos
                <ChevronRightIcon size={20} />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </main>
  );
}
