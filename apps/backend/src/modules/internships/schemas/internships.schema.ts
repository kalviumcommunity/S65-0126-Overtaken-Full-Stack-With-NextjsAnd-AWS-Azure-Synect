import { InternshipStatus } from "@prisma/client";
import { z } from "zod";

export const createInternshipSchema = z.object({
  company: z.string().min(1),
  roleTitle: z.string().min(1),
  status: z.nativeEnum(InternshipStatus).optional(),
  applicationLink: z.string().url().optional(),
  notes: z.string().optional(),
});

export const updateInternshipSchema = createInternshipSchema.partial();

export type CreateInternshipInput = z.infer<typeof createInternshipSchema>;
export type UpdateInternshipInput = z.infer<typeof updateInternshipSchema>;
