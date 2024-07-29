import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductInfo from "./_components/product-info";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import ProductList from "@/app/_components/product-list";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const session = await getServerSession(authOptions);

  const product = await db.product.findUnique({
    where: { id },
    include: { restaurant: true },
  });

  if (!product) {
    return notFound();
  }
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: { id: product?.restaurant.id },
    },

    include: { restaurant: true },
  });

  return (
    <>
      <div className="hidden md:block ">
        <Header>
          <Search className="md:w-3/5" />
        </Header>
      </div>
      <div className="md:container md:mt-5">
        <div className="md:grid md:grid-cols-2 md:gap-3">
          <div className="">
            <ProductImage product={product} />
          </div>
          <ProductInfo
            product={product}
            complementaryProducts={juices}
            isAuthenticated={!!session?.user}
          />
        </div>
        <div className="mt-6 hidden space-y-3 md:block">
          <h3 className="font-semibold">Sucos</h3>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
