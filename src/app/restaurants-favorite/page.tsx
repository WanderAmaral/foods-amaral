import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import RestaurantItem from "../_components/restaurant-item";
import { redirect } from "next/navigation";
import Search from "../_components/search";

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
    <>
      <Header>
        <Search className="md:w-3/5" />
      </Header>
      <div className="px-5 md:container">
        <div className=" md:overflow-x-scroll ">
          <h2 className="mb-6 py-5 text-lg font-semibold">
            Restaurantes Favoritos
          </h2>
          <div className="flex w-full flex-col gap-6 md:flex md:flex-row">
            {restaurantsFavorites.length > 0 ? (
              restaurantsFavorites.map(({ restaurant }) => (
                <RestaurantItem
                  restaurant={restaurant}
                  key={restaurant.id}
                  userFavoriteRestaurants={restaurantsFavorites}
                  className="min-w-full max-w-full "
                />
              ))
            ) : (
              <h3 className="font-medium">
                Você ainda não marcou nenhum restaurante como favorito.
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsFavorites;
