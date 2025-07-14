"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "../../schemas/form";
import { searchAddress } from "../../services/searchAddress";
import ShippingSelector from "./Shipping/Selector";

type FormSectionProps = PropsWithChildren & {
  title: string;
};

const Section = ({ title, children }: FormSectionProps) => {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg w-full">
      <h2 className="text-lg font-medium text-center">{title}</h2>
      {children}
    </div>
  );
};

type CheckoutFormProps = {
  form: UseFormReturn<CheckoutFormData>;
};

const CheckoutForm = ({ form }: CheckoutFormProps) => {
  const [isOtherPerson, setIsOtherPerson] = useState(false);

  const handleSearchAddress = (e: ChangeEvent<HTMLInputElement>) => {
    searchAddress(e.target.value);
  };

  const debouncedSearchAddress = debounce(handleSearchAddress, 500);

  return (
    <div className="flex flex-col items-end gap-2.5">
      <Section title="Dados de contato">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isOtherPerson}
            onCheckedChange={() => setIsOtherPerson((checked) => !checked)}
            className="data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-none"
          />
          <Label>Receber ofertas e novidades pelo e-mail</Label>
        </div>
      </Section>
      <Section title="Entrega">
        <ShippingSelector form={form} />
      </Section>
      <Section title="Dados para nota fiscal">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="País" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="CPF ou CNPJ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Dados de quem vai fazer o pagamento</Label>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Telefone com DDD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="CEP"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedSearchAddress(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="otherPerson"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setIsOtherPerson(!!checked);
                    }}
                    className="data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-none"
                  />
                </FormControl>
                <FormLabel>Outra pessoa buscará pelo pedido</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AnimatePresence>
          {isOtherPerson && (
            <motion.div
              key="otherPersonFields"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="otherPersonName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome da outra pessoa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherPersonLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Sobrenome da outra pessoa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
};

export default CheckoutForm;
