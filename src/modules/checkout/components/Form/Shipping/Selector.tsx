import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import type { ShippingOption as ShippingOptionType } from "@/lib/api";
import fetcher from "@/lib/fetcher";
import { CheckoutFormData } from "@/modules/checkout/schemas/form";
import useSWR from "swr";
import MoreOptionsButton from "./MoreOptionsButton";
import ShippingOption from "./Option";

type ShippingSelectorProps = {
  form: UseFormReturn<CheckoutFormData>;
};

const ShippingSelector = ({ form }: ShippingSelectorProps) => {
  const {
    data: shippingOptions,
    isLoading,
    error,
  } = useSWR<ShippingOptionType[]>("/api/shipping", fetcher, {
    errorRetryInterval: 1000,
    errorRetryCount: 3,
    shouldRetryOnError: true,
    dedupingInterval: 2000,
  });
  const [expanded, setExpanded] = useState(false);

  const selectedOptionId = form.watch("shipping");

  const options = useMemo(() => {
    if (!shippingOptions) return [];

    return expanded
      ? shippingOptions
      : shippingOptions.filter((option) => option.id === selectedOptionId);
  }, [expanded, shippingOptions, selectedOptionId]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  if (error) {
    return (
      <div className="flex flex-col gap-3 p-4 border rounded-md border-red-200 bg-red-50">
        <div className="text-sm text-red-600">
          Failed to load shipping options. Please try again.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name="shipping"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                defaultValue={field.value}
                value={field.value}
                onValueChange={field.onChange}
              >
                <AnimatePresence>
                  {options.map((option) => (
                    <FormItem key={option.id}>
                      <FormControl>
                        <ShippingOption
                          {...option}
                          isSelected={option.id === selectedOptionId}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </AnimatePresence>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <MoreOptionsButton expanded={expanded} onClick={handleToggleExpand} />
    </div>
  );
};

export default ShippingSelector;
