"use client";

import { Button } from "@/components/ui/button";
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
import { MapPin } from "lucide-react";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "../../schemas/form";
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
  onAddressChange: (zipCode: string) => void;
  showAddress: boolean;
  removeAddress: () => void;
};

const CheckoutForm = ({
  form,
  onAddressChange,
  showAddress,
  removeAddress,
}: CheckoutFormProps) => {
  const [isOtherPerson, setIsOtherPerson] = useState(false);
  const showZipCode = !showAddress;

  const handleSearchAddress = (e: ChangeEvent<HTMLInputElement>) => {
    onAddressChange(e.target.value);
  };
  const debouncedSearchAddress = debounce(handleSearchAddress, 500);

  const addressFirstLine = form.watch("street");
  const zipCodeFormatted = `ZIP ${form.watch("zipCode")}`;
  const neighborhood = form.watch("neighborhood");
  const addressThirdLine = form.watch("city") + " " + form.watch("state");

  return (
    <div className="flex flex-col items-end gap-2.5">
      <Section title="Contact Information">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
          <Label>Receive offers and news by email</Label>
        </div>
      </Section>
      <Section title="Delivery">
        <ShippingSelector form={form} />
      </Section>
      <Section title="Billing Information">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Country" {...field} />
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
                <Input placeholder="CPF or CNPJ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Payment Information</Label>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} />
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
                <Input placeholder="Last Name" {...field} />
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
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showZipCode && (
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="ZIP Code"
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
        )}

        {showAddress && (
          <div className="p-3 border rounded-md w-full flex items-center justify-between">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-5 text-foreground" />
              </div>
              <div className="flex flex-col text-xs">
                <div>{addressFirstLine}</div>
                <div>
                  <span className="font-bold">{zipCodeFormatted}</span> -{" "}
                  {neighborhood}
                </div>
                <div>{addressThirdLine}</div>
              </div>
            </div>
            <Button
              variant="link"
              className="text-xs text-brand underline cursor-pointer  hover:scale-105 transition-all duration-300"
              onClick={removeAddress}
              type="button"
            >
              Change
            </Button>
          </div>
        )}

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
                <FormLabel>Someone else will pick up the order</FormLabel>
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
                      <Input
                        placeholder="Other person's first name"
                        {...field}
                      />
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
                        placeholder="Other person's last name"
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
