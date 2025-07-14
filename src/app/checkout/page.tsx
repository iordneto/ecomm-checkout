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

const CheckoutPage = () => {
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
      shipping: "retirar",
      country: "",
      cpf: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row ">
            <div className="w-full md:w-8/12">
              <CheckoutForm form={form} />
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
