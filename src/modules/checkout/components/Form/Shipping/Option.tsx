import { RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ShippingData } from "../../../types/shipping";

type ShippingOptionProps = ShippingData;

const ShippingOption = ({
  title,
  description,
  price,
  id,
  isSelected,
}: ShippingOptionProps) => {
  const formattedPrice = price ? `R$ ${price.toFixed(2)}` : "Grátis";
  const ref = useRef<HTMLLabelElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex p-4 border rounded-md gap-3 cursor-pointer ${
        isSelected ? "border-brand" : ""
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => ref.current?.click()}
    >
      <RadioGroupItem
        value={id}
        id={id}
        className={isSelected ? "border-brand text-brand" : ""}
      />
      <Label
        ref={ref}
        htmlFor={id}
        className="flex justify-between w-full cursor-pointer"
      >
        <div className="flex flex-col gap-1 items-start justify-start">
          {title}
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
        <span className={isSelected ? "text-brand font-medium" : ""}>
          {formattedPrice}
        </span>
      </Label>
    </motion.div>
  );
};

export default ShippingOption;
