"use client";

import Image from "@/components/Image";
import type { CartSummary } from "@/lib/api";
import fetcher from "@/lib/fetcher";
import { formatPrice } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";

const ProductsSection = () => {
  const { data, isLoading, error } = useSWR<CartSummary>("/api/cart", fetcher, {
    errorRetryInterval: 1000,
    errorRetryCount: 3,
    shouldRetryOnError: true,
    dedupingInterval: 2000,
  });
  const products = useMemo(() => data?.products || [], [data]);

  if (error) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="p-4 border rounded-md border-red-200 bg-red-50">
          <div className="text-sm text-red-600">
            Failed to load products. Please refresh the page.
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

  return (
    <div className="flex flex-col gap-3 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center w-full"
        >
          <div className="flex gap-4 items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={51}
              height={64}
            />
            <div className="font-bold text-sm">{product.name}</div>
          </div>
          <div className="font-bold text-sm text-right">
            {formatPrice(product.price)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;
