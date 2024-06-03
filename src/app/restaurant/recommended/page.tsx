import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <div className=" space-y-2 px-5">
      <Header />

      <h2 className="text-lg font-semibold py-3">Restaurantes Favoritos</h2>
      <div className=" flex flex-col gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedRestaurants;