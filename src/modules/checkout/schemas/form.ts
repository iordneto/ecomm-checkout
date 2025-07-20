import {
  isValidBrazilianPhone,
  isValidCEP,
  isValidCPForCNPJ,
} from "@/lib/validations";
import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .refine(isValidBrazilianPhone, "Invalid phone number"),
    zipCode: z
      .string()
      .min(1, "ZIP code is required")
      .refine(isValidCEP, "Invalid ZIP code"),
    email: z.email("Invalid email").min(1, "Email is required"),
    otherPerson: z.boolean(),
    otherPersonName: z.string().optional(),
    otherPersonLastName: z.string().optional(),
    shipping: z.string().min(1, "Shipping is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    neighborhood: z.string().min(1, "Neighborhood is required"),
    street: z.string().min(1, "Street is required"),
    cpf: z
      .string()
      .min(1, "CPF/CNPJ is required")
      .refine(isValidCPForCNPJ, "Invalid CPF or CNPJ"),
  })
  .refine(
    (data) => {
      if (data.otherPerson) {
        return data.otherPersonName && data.otherPersonName.length > 0;
      }
      return true;
    },
    {
      message: "Name is required",
      path: ["otherPersonName"],
    }
  )
  .refine(
    (data) => {
      if (data.otherPerson) {
        return data.otherPersonLastName && data.otherPersonLastName.length > 0;
      }
      return true;
    },
    {
      message: "Last name is required",
      path: ["otherPersonLastName"],
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
