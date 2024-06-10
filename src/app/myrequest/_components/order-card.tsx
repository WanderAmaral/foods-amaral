"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrderCardProps {
  order: Prisma.OrderGetPayload<{
    include: { restaurant: true; products: { include: { product: true } } };
  }>;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <>
      <Card className="p-0">
        <div className="px-3">
          <Badge
            className="my-4"
            variant={order.status === "CONFIRMED" ? "green" : "red"}
          >
            {order.status}
          </Badge>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <div className="relative h-6 w-6">
                <Image
                  src={order.restaurant.imageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className=" text-base font-semibold">
                {order.restaurant.name}
              </span>
            </div>
            <div className="flex items-end justify-end">
              <Link href={`/restaurants/${order.restaurantId}`}>
                <ChevronRight />
              </Link>
            </div>
          </div>
          <Separator className="my-4" />
          {order.products.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Badge className="bg-[#7E8392] text-white">{item.quantity}</Badge>
              <span className=" text-sm text-muted-foreground">
                {item?.product?.name}
              </span>
            </div>
          ))}
          <Separator className="my-4" />
          <div className="flex items-center justify-between pb-3">
            <p className="text-sm">
              R$: {formatCurrency(Number(order.totalPrice))}
            </p>
            <Button variant={"ghost"} className="font-semibold text-red-600">
              Adicionar a sacola
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OrderCard;
