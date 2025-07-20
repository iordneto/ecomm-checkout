import { RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShippingData } from "../../../types/shipping";

type ShippingOptionProps = ShippingData;

const ShippingOption = ({
  title,
  description,
  price,
  id,
  isSelected,
}: ShippingOptionProps) => {
  const getFormattedPrice = () => {
    if (!price) return "Free";
    return formatPrice(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Label
        htmlFor={id}
        className={`flex justify-between w-full p-4 border rounded-md gap-3 cursor-pointer ${
          isSelected ? "border-brand" : ""
        }`}
      >
        <div className="flex items-start gap-3">
          <RadioGroupItem
            value={id}
            id={id}
            className={isSelected ? "border-brand text-brand" : ""}
          />
          <div className="flex flex-col gap-1 items-start justify-start">
            {title}
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </div>
        <span className={isSelected ? "text-brand font-medium" : ""}>
          {getFormattedPrice()}
        </span>
      </Label>
    </motion.div>
  );
};

export default ShippingOption;
