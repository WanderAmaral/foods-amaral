import { db } from "@/app/_lib/prisma";
import RestaurantImage from "./components/restaurant-image";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/app/_helpers/price";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import { Card } from "@/app/_components/ui/card";
import Image from "next/image";

interface RestaurantPageProps {
  params: { id: string };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: { categories: true },
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
            <StarIcon size={16} />
            <span>5.0</span>
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

      <div className="flex overflow-x-scroll">
        {restaurant.categories.map((category) => (
          <div key={category.id} className="flex gap-1 px-4">
            <div className="rounded-full bg-zinc-300 px-2">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RestaurantPage;
