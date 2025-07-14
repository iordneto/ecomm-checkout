"use client";

import { CartSummary } from "@/lib/api";
import fetcher from "@/lib/fetcher";
import { formatPrice } from "@/lib/utils";
import useSWR from "swr";
const TotalsSection = () => {
  const { data, isLoading } = useSWR<CartSummary>("/api/cart", fetcher);

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const { subtotal: subTotal, shipping, total } = data || {};

  const getFormattedPrice = (price: number) => {
    if (!price) return "Grátis";
    return formatPrice(price);
  };

  return (
    <div className="flex flex-col gap-1.5 py-3 w-full">
      <div className="flex justify-between items-center text-sm border-b pb-1.5">
        <div>Subtotal</div>
        {subTotal && <div>{getFormattedPrice(subTotal)}</div>}
      </div>
      <div className="flex justify-between items-center text-sm border-b pb-1.5">
        <div>Frete</div>
        {shipping && <div>{getFormattedPrice(shipping)}</div>}
      </div>
      <div className="flex justify-between items-center font-bold text-lg">
        <div>Total</div>
        {total && <div>{getFormattedPrice(total)}</div>}
      </div>
    </div>
  );
};

export default TotalsSection;
