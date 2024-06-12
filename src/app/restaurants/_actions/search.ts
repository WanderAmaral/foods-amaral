"use server";

import { db } from "@/app/_lib/prisma";
import { Restaurant } from "@prisma/client";

export const searchForRestaurants = async (search: string): Promise<Restaurant[]> => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  return restaurants;
};
