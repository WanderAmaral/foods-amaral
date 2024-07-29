import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className=" space-y-2 px-5">
      <Header />

      <div className="md:container ">
        <h2 className="py-3 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className=" flex flex-col gap-6 md:flex md:flex-row md:overflow-x-scroll">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedRestaurants;
