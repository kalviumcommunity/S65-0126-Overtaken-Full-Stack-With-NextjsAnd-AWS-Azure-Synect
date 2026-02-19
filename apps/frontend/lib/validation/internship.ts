import { z } from "zod";

export const internshipSchema = z.object({
  company: z.string().min(1, "Company is required"),
  roleTitle: z.string().min(1, "Role title is required"),
  status: z.enum(["APPLIED", "ACTIVE", "COMPLETED"]),
  applicationLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  notes: z.string().max(300, "Notes must be under 300 characters").optional(),
});

export type InternshipFormValues = z.infer<typeof internshipSchema>;
