import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });

  return (
    <div className="flex gap-5 overflow-x-scroll md:[&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          restaurant={restaurant}
          key={restaurant.id}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
