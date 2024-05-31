import { db } from "@/app/_lib/prisma";
import RestaurantImage from "./components/restaurant-image";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: { id: string };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <RestaurantImage restaurant={restaurant} />
    </>
  );
};

export default RestaurantPage;
