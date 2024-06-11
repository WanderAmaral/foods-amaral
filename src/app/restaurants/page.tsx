import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import Restaurants from "./_components/page";

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
    include: { restaurant: true },
  });

  return (
    <div className=" space-y-2 px-5">
      <div className=" flex flex-col gap-6">
        <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
      </div>
    </div>
  );
};

export default RestaurantsPage;
