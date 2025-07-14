import { formatPrice } from "@/lib/utils";

const TotalsSection = () => {
  const subTotal = 25000;
  const shipping = 5000;
  const total = subTotal + shipping;

  const getFormattedPrice = (price: number) => {
    if (!price) return "Grátis";
    return formatPrice(price);
  };

  return (
    <div className="flex flex-col gap-1.5 py-3 w-full">
      <div className="flex justify-between items-center text-sm border-b pb-1.5">
        <div>Subtotal</div>
        <div>{getFormattedPrice(subTotal)}</div>
      </div>
      <div className="flex justify-between items-center text-sm border-b pb-1.5">
        <div>Frete</div>
        <div>{getFormattedPrice(shipping)}</div>
      </div>
      <div className="flex justify-between items-center font-bold text-lg">
        <div>Total</div>
        <div>{getFormattedPrice(total)}</div>
      </div>
    </div>
  );
};

export default TotalsSection;
