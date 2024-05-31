"use client";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className=" object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-3xl bg-white text-foreground "
        variant={"secondary"}
        size={"icon"}
        onClick={handleClickBack}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default RestaurantImage;
