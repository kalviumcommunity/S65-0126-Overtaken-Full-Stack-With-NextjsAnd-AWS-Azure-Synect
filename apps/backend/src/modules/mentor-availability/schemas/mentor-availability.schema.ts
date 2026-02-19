import { z } from "zod";

export const createAvailabilitySchema = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>;
