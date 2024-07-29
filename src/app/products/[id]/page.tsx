import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductInfo from "./_components/product-info";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

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
      <div className="hidden md:hidden">
        <ProductImage product={product} />
      </div>
      <ProductInfo
        product={product}
        complementaryProducts={juices}
        isAuthenticated={!!session?.user}
      />
    </>
  );
};

export default ProductPage;
