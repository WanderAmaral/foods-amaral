import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import Restaurants from "./_components/restaurants";
import { Suspense } from "react";

export default async function RestaurantsPage() {
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
    include: { restaurant: true },
  });

  return (
    <div className=" space-y-2 px-5">
      <div className=" flex flex-col gap-6">
        <Suspense fallback={<p>Carregando...</p>}>
          <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
        </Suspense>
      </div>
    </div>
  );
}
