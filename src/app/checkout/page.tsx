"use client";

import CheckoutForm from "@/modules/checkout/components/Form";
import CheckoutSummary from "@/modules/checkout/components/Summary";

const CheckoutPage = () => {
  return (
    <div className="flex mb-10 gap-3">
      <div className="w-8/12">
        <CheckoutForm />
      </div>
      <div className="w-4/12">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
