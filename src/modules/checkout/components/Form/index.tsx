"use client";

import Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ShippingSelector from "./Shipping/Selector";

const CheckoutForm = () => {
  return (
    <Form>
      <Form.Section title="Dados de contato">
        <Input placeholder="E-mail" />
      </Form.Section>
      <Form.Section title="Entrega">
        <ShippingSelector />
      </Form.Section>
      <Form.Section title="Pagamento"></Form.Section>
    </Form>
  );
};

export default CheckoutForm;
