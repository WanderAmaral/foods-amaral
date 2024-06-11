import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import OrderCard from "./_components/order-card";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";

const MyResquest = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    include: { restaurant: true, products: { include: { product: true } } },
  });

  return (
    <div className="px-5">
      <Header />

      <h1 className="py-5 text-xl font-semibold">Meus pedidos</h1>
      <div className="flex flex-col pb-5 gap-5">
      {orders.map((order) => (
          <OrderCard order={order} key={order.id} />
      ))}
      </div>
    </div>
  );
};

export default MyResquest;
