import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true } } };
  }>[];
}

const ProductList = async ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-5 overflow-x-scroll">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
