"use client";

import CheckoutForm from "../../modules/checkout/components/Form";

const CheckoutPage = () => {
  return (
    <div className="flex">
      <div className="w-8/12">
        <CheckoutForm />
      </div>
      <div className="w-4/12"></div>
    </div>
  );
};

export default CheckoutPage;
