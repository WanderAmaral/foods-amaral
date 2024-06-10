import { db } from "@/app/_lib/prisma";
import RestaurantImage from "./components/restaurant-image";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/app/_helpers/price";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import { Card } from "@/app/_components/ui/card";
import Image from "next/image";
import ProductList from "@/app/_components/product-list";
import SheetBag from "./components/sheet-bag";

interface RestaurantPageProps {
  params: { id: string };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <RestaurantImage restaurant={restaurant} />
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="relative h-6 w-6">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className=" text-base font-semibold">{restaurant.name}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-zinc-600 px-3 py-1 text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className=" text-sm">5.0</span>
          </div>
        </div>
        <Card className="mt-6 flex justify-around py-3">
          {/* Custo */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon />
            </div>
            {Number(restaurant.deliveryFee) > 0 ? (
              <p className="text-sm font-semibold">
                {formatCurrency(Number(restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon />
            </div>

            <p className="text-sm font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </Card>
      </div>

      <div className="flex gap-4 overflow-x-scroll px-5 py-4 [&::-webkit-crollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className=" min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 px-5">
        <h2 className="py-2 text-lg  font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-4 px-5" key={category.id}>
          <h2 className="py-2 text-lg  font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <SheetBag />
    </>
  );
};

export default RestaurantPage;
