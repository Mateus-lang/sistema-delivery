import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold"></h2>
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      </div>

      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Boas vindas</h3>
        <p className="opacity-50">
          Escolha como prefere aproveitar sua refeição. Estamos prontos para
          oferecer praticidade e sabor em cada detalhe
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          option="DINE_IN"
          slug={slug}
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
        />
        <ConsumptionMethodOption
          option="TAKEAWAY"
          slug={slug}
          buttonText="Retirada"
          imageAlt="Retirada"
          imageUrl="/take_away.png"
        />
        <ConsumptionMethodOption
          option="DELIVERY"
          slug={slug}
          buttonText="Entrega"
          imageAlt="Entrega"
          imageUrl="/delivery.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
