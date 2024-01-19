import { z } from "zod";

export const authenticationUtils = () => {
  const singInFormSchema = z.object({
    email: z.string().trim().email("This is not a valid email."),
    password: z
      .string()
      .trim()
      .refine((data) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])\S{8,}$/.test(
          data
        );
      }, "The password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, no whitespace and one special character."),
  });

  const singUpFormSchema = singInFormSchema.extend({
    username: z
      .string()
      .trim()
      .min(4, "The username must have at least 4 characters.")
      .max(20, "The username must have at most 20 characters."),
  });

  const editUserFormSchema = singUpFormSchema.extend({
    newPassword: z
      .string()
      .trim()
      .refine((data) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])\S{8,}$/.test(
          data
        );
      }, "The password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, no whitespace and one special character."),
  });

  const authorizeSchema = z.object({
    id: z
      .string()
      .trim()
      .refine((data) => {
        return /^[0-9]+$/.test(data);
      }, "Wrong id"),
    username: singUpFormSchema.shape.username,
    email: singUpFormSchema.shape.email,
    access_token: z
      .string()
      .trim()
      .refine((data) => {
        return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/.test(
          data
        );
      }, "Wrong token."),
    refresh_token: z
      .string()
      .trim()
      .refine((data) => {
        return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/.test(
          data
        );
      }, "Wrong token."),
  });

  return {
    singInFormSchema,
    singUpFormSchema,
    authorizeSchema,
    editUserFormSchema,
  };
};
