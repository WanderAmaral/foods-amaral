import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="flex gap-5 overflow-x-scroll">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RestaurantList;
