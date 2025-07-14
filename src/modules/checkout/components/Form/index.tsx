"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ShippingSelector from "./Shipping/Selector";

const CheckoutForm = () => {
  const [isOtherPerson, setIsOtherPerson] = useState(false);

  return (
    <Form>
      <Form.Section title="Dados de contato">
        <Input placeholder="E-mail" />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isOtherPerson}
            onCheckedChange={() => setIsOtherPerson((checked) => !checked)}
            className="data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-none"
          />
          <Label>Receber ofertas e novidades pelo e-mail</Label>
        </div>
      </Form.Section>
      <Form.Section title="Entrega">
        <ShippingSelector />
      </Form.Section>
      <Form.Section title="Dados para nota fiscal">
        <Input placeholder="País" />
        <Input placeholder="CPF ou CNPJ" />
        <Label>Dados de quem vai fazer o pagamento</Label>
        <Input placeholder="Nome" />
        <Input placeholder="Sobrenome" />
        <Input placeholder="Telefone com DDD" />
        <Input placeholder="CEP" />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isOtherPerson}
            onCheckedChange={() => setIsOtherPerson((checked) => !checked)}
            className="data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-none"
          />
          <Label>Outra pessoa buscará pelo pedido</Label>
        </div>
        <Input placeholder="Nome" />
        <Input placeholder="Sobrenome" />
      </Form.Section>
      <Form.Footer>
        <Button size="xl" className="uppercase bg-brand">
          Continuar para pagamento
        </Button>
      </Form.Footer>
    </Form>
  );
};

export default CheckoutForm;
