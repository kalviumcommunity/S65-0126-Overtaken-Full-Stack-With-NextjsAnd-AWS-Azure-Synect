import { z } from "zod";

export const sendWelcomeEmailSchema = z.object({
  to: z.string().email(),
  recipientName: z.string().min(1).max(120),
});

export const sendNotificationEmailSchema = z.object({
  to: z.string().email(),
  title: z.string().min(1).max(120),
  message: z.string().min(1).max(2000),
});

export type SendWelcomeEmailInput = z.infer<typeof sendWelcomeEmailSchema>;
export type SendNotificationEmailInput = z.infer<typeof sendNotificationEmailSchema>;
