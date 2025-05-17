import { z } from "zod";

export const stepNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(48, "Password must not exceed 48 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type StepNewPasswordData = z.infer<typeof stepNewPasswordSchema>;
