import { z } from "zod";
import selectValues from "../contact/contactSelectValues";

export const emailUtils = () => {
  const emailFormSchema = z.object({
    sender: z.string().trim().email("This is not a valid email."),
    subject: z
      .string()
      .trim()
      .refine((value) => selectValues.has(value), {
        message:
          "Invalid subject. Choose from: Exclusive buy offer, Technical issues, Transaction issues, Other.",
      }),
    msgBody: z
      .string()
      .trim()
      .min(50, "The message must have at least 50 characters.")
      .max(100, "The message must have at most 100 characters."),
  });

  return {
    emailFormSchema,
  };
};
