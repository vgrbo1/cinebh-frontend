import { z } from "zod";

export const stepEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type StepEmailData = z.infer<typeof stepEmailSchema>;
