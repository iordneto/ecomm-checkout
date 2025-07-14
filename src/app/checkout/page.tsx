"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CheckoutForm from "@/modules/checkout/components/Form";
import CheckoutSummary from "@/modules/checkout/components/Summary";
import {
  checkoutFormSchema,
  type CheckoutFormData,
} from "@/modules/checkout/schemas/form";
import { searchAddress } from "@/modules/checkout/services/searchAddress";
import { useState } from "react";

const CheckoutPage = () => {
  const [showAddress, setShowAddress] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      zipCode: "",
      email: "",
      otherPerson: false,
      otherPersonName: "",
      otherPersonLastName: "",
      shipping: "1",
      country: "",
      cpf: "",
    },
  });

  const handleAddressChange = (zipCode: string) => {
    searchAddress(zipCode).then((data) => {
      if (data) {
        form.setValue("street", data?.street || "");
        form.setValue("neighborhood", data?.neighborhood || "");
        form.setValue("city", data?.city || "");
        form.setValue("state", data?.state || "");
        form.setValue("country", data?.country || "");
        setShowAddress(true);
      }
    });
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row ">
            <div className="w-full md:w-8/12">
              <CheckoutForm
                form={form}
                onAddressChange={handleAddressChange}
                showAddress={showAddress}
              />
            </div>
            <div className="w-full md:w-4/12">
              <CheckoutSummary />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="w-full md:w-8/12 flex justify-end mb-10">
              <Button type="submit" size="xl" className="uppercase bg-brand">
                Continuar para pagamento
              </Button>
            </div>
            <div className="flex w-full md:w-4/12"></div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutPage;
