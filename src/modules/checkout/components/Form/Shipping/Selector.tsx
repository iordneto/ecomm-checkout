import { RadioGroup } from "@/components/ui/radio-group";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { ShippingData } from "../../../types/shipping";
import MoreOptionsButton from "./MoreOptionsButton";
import ShippingOption from "./Option";

const ShippingSelector = () => {
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
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    shippingOptions[0].id
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const options = expanded
    ? shippingOptions
    : shippingOptions.filter((option) => option.id === selectedOptionId);

  const handleToggleExpand = () => {
    setIsTransitioning(true);
    setExpanded(!expanded);

    // Reaparecer o botão após a transição
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        defaultValue="retirar"
        value={selectedOptionId}
        onValueChange={setSelectedOptionId}
      >
        <AnimatePresence>
          {options.map((option, index) => (
            <ShippingOption
              key={option.id}
              {...option}
              isSelected={option.id === selectedOptionId}
            />
          ))}
        </AnimatePresence>
      </RadioGroup>
      <MoreOptionsButton expanded={expanded} onClick={handleToggleExpand} />
    </div>
  );
};

export default ShippingSelector;
