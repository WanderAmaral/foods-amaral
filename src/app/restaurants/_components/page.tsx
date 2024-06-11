"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({userFavoriteRestaurants}: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    try {
      setIsLoading(false);
      const fetchRestaurants = async () => {
        const searchFor = searchParams.get("search");
        if (!searchFor) return;

        const foundRestaurants = await searchForRestaurants(searchFor);
        setRestaurants(foundRestaurants);
      };
      fetchRestaurants();
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  const searchFor = searchParams.get("search");

  if (!searchFor) {
    return notFound();
  }

  if (!isLoading) {
    return;
  }
  return (
    <div className=" space-y-2 px-5">
      <Header />
      {restaurants.length > 0 ? (
        <h2 className="py-3 text-lg font-semibold">Restaurantes encontrados</h2>
      ) : (
        <h2 className="py-3 text-lg font-semibold">
          Restaurantes não encontrados
        </h2>
      )}

      <div className=" flex flex-col gap-6">
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
  );
};

export default Restaurants;
