import { z } from "zod";

export const updateStudentProfileSchema = z.object({
  fullName: z.string().min(1).optional(),
  university: z.string().min(1).optional(),
  program: z.string().min(1).optional(),
  graduationYear: z.number().int().min(2000).max(2100).optional(),
  bio: z.string().min(1).optional(),
});

export const updateMentorProfileSchema = z.object({
  fullName: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  expertise: z.string().min(1).optional(),
});

export type UpdateStudentProfileInput = z.infer<typeof updateStudentProfileSchema>;
export type UpdateMentorProfileInput = z.infer<typeof updateMentorProfileSchema>;
