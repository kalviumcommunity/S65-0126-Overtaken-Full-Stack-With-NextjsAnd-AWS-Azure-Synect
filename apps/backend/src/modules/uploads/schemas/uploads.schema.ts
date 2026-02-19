import { z } from "zod";

export const createUploadUrlSchema = z.object({
  fileName: z.string().min(1).max(255),
  contentType: z.string().min(1).max(100),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(10 * 1024 * 1024),
});

export const completeUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileKey: z.string().min(1),
  contentType: z.string().min(1).max(100),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(10 * 1024 * 1024),
  fileUrl: z.string().url(),
});

export type CreateUploadUrlInput = z.infer<typeof createUploadUrlSchema>;
export type CompleteUploadInput = z.infer<typeof completeUploadSchema>;
