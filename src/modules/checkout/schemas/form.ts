import {
  isValidBrazilianPhone,
  isValidCEP,
  isValidCPForCNPJ,
} from "@/lib/validations";
import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .refine(isValidBrazilianPhone, "Telefone inválido"),
    zipCode: z
      .string()
      .min(1, "CEP é obrigatório")
      .refine(isValidCEP, "CEP inválido"),
    email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
    otherPerson: z.boolean(),
    otherPersonName: z.string().optional(),
    otherPersonLastName: z.string().optional(),
    shipping: z.string().min(1, "Frete é obrigatório"),
    country: z.string().min(1, "País é obrigatório"),
    cpf: z
      .string()
      .min(1, "CPF/CNPJ é obrigatório")
      .refine(isValidCPForCNPJ, "CPF ou CNPJ inválido"),
  })
  .refine(
    (data) => {
      if (data.otherPerson) {
        return data.otherPersonName && data.otherPersonName.length > 0;
      }
      return true;
    },
    {
      message: "Nome é obrigatório",
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
      message: "Sobrenome é obrigatório",
      path: ["otherPersonLastName"],
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
