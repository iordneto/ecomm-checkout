import { Button } from "@/components/ui/button";

import CouponFilledIcon from "@/components/icons/coupon-filled";
import ProductsSection from "./Section/Products";
import TotalsSection from "./Section/Totals";

const CheckoutSummary = () => {
  return (
    <div className="flex flex-col border rounded-md p-3 gap-3">
      <ProductsSection />
      <TotalsSection />
      <div className="py-3 w-full border rounded-md">
        <Button
          variant="link"
          className="text-sm text-brand text-center w-full cursor-pointer"
        >
          <CouponFilledIcon />
          Adicionar cupom de desconto
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
