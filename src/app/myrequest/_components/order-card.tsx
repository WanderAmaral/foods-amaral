import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

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
              <ChevronRight />
            </div>
          </div>
          <Separator className="my-4" />
          {order.products.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <Badge  className="text-white bg-[#7E8392]">
                {item.quantity}
              </Badge>
              <span className=" text-muted-foreground text-sm">{item?.product?.name}</span>
            </div>
          ))}
          <Separator className="my-4" />
          <div className="flex justify-between items-center pb-3">
            <p className="text-sm">R$: {Number(order.totalPrice)}</p>
            <Button variant={'ghost'} className="text-red-600 font-semibold">Adicionar a sacola</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OrderCard;
