import { z } from "zod";

export const authenticationUtils = () => {
  const singUpFormSchema = z.object({
    username: z
      .string()
      .trim()
      .min(4, "The username must have at least 4 characters.")
      .max(20, "The username must have at most 20 characters."),
    email: z.string().trim().email("This is not a valid email."),
    password: z
      .string()
      .trim()
      .refine((data) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])\S{8,}$/.test(data);
      }, "The password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, no whitespace and one special character."),
  });

  return { singUpFormSchema };
};
