import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import OrderCard from "./_components/order-card";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import Search from "../_components/search";

const MyResquest = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    include: {
      restaurant: true,
      products: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header className="md:w-full">
        <Search className="md:w-3/5" />
      </Header>
      <div className="px-5 md:container">
        <h1 className="py-5 text-xl font-semibold ">Meus pedidos</h1>
        <div className="flex flex-col gap-5 pb-5">
          {orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyResquest;
