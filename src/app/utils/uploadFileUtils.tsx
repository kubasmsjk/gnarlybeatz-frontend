import { z } from "zod";

export const uploadFileUtils = () => {
  const uploadFileFormSchema = z.object({
    genre: z
      .string()
      .trim()
      .min(3, "The genre must have at least 3 characters.")
      .max(10, "The genre must have at most 10 characters."),
    mood: z
      .string()
      .trim()
      .min(3, "The mood must have at least 3 characters.")
      .max(20, "The mood must have at most 20 characters."),
    bpm: z
      .string()
      .trim()
      .min(2, "The bpm must have at least 2 characters.")
      .max(3, "The bpm must have at most 3 characters."),
    key: z
      .string()
      .trim()
      .min(3, "The key must have at least 3 characters.")
      .max(5, "The key must have at most 5 characters."),
  });

  return {
    uploadFileFormSchema,
  };
};
