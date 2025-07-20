"use client";

import { CartSummary } from "@/lib/api";
import fetcher from "@/lib/fetcher";
import { formatPrice } from "@/lib/utils";
import useSWR from "swr";

const TotalsSection = () => {
  const { data, isLoading, error } = useSWR<CartSummary>("/api/cart", fetcher, {
    errorRetryInterval: 1000,
    errorRetryCount: 3,
    shouldRetryOnError: true,
    dedupingInterval: 2000,
  });

  if (error) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="p-4 border rounded-md border-red-200 bg-red-50">
          <div className="text-sm text-red-600">
            Failed to load cart totals. Please refresh the page.
          </div>
        </div>
      </div>
    );
  }

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
    if (!price) return "Free";
    return formatPrice(price);
  };

  return (
    <div className="flex flex-col gap-1.5 py-3 w-full">
      <div className="flex justify-between items-center text-sm border-b pb-1.5">
        <div>Subtotal</div>
        {subTotal && <div>{getFormattedPrice(subTotal)}</div>}
      </div>
      <div className="flex justify-between items-center text-sm border-b pb-1.5">
        <div>Shipping</div>
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
