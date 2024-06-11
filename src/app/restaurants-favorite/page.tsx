import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import RestaurantItem from "../_components/restaurant-item";
import { redirect } from "next/navigation";

const RestaurantsFavorites = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const restaurantsFavorites = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="px-5">
      <Header />
      <h2 className="mb-6 py-5 text-lg font-semibold">
        Restaurantes Favoritos
      </h2>
      <div className="flex w-full flex-col gap-6">
        {restaurantsFavorites.length > 0 ? (
          restaurantsFavorites.map(({ restaurant }) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              userFavoriteRestaurants={restaurantsFavorites}
              className="min-w-full max-w-full"
            />
          ))
        ) : (
          <h3 className="font-medium">
            Você ainda não marcou nenhum restaurante como favorito.
          </h3>
        )}
      </div>
    </div>
  );
};

export default RestaurantsFavorites;
