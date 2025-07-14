import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { CheckoutFormData } from "@/modules/checkout/schemas/form";
import { ShippingData } from "../../../types/shipping";
import MoreOptionsButton from "./MoreOptionsButton";
import ShippingOption from "./Option";

type ShippingSelectorProps = {
  form: UseFormReturn<CheckoutFormData>;
};

const ShippingSelector = ({ form }: ShippingSelectorProps) => {
  const shippingOptions: ShippingData[] = [
    {
      id: "retirar",
      title: "Pedido a ser retirado em MUNDALUA Castelo",
      description: "Avenida Miguel Perrela, 455 - Castelo",
      price: 0,
    },
    {
      id: "sedex",
      title: "Sedex",
      description: "Entrega em 3 dias úteis",
      price: 10,
    },
    {
      id: "pac",
      title: "PAC",
      description: "Entrega em 5 dias úteis",
      price: 15,
    },
  ];
  const [expanded, setExpanded] = useState(false);

  const selectedOptionId = form.watch("shipping");

  const options = expanded
    ? shippingOptions
    : shippingOptions.filter((option) => option.id === selectedOptionId);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

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
                        <ShippingOption {...option} />
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
